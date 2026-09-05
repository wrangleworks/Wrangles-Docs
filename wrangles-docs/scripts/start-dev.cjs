const fs = require('fs');
const http = require('http');
const path = require('path');
const {spawn} = require('child_process');
const httpProxy = require('http-proxy');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const env = {};
  for (const rawLine of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    env[key] = value;
  }

  return env;
}

const siteDir = path.resolve(__dirname, '..');
const publicPort = Number(process.env.PORT || 3000);
const docusaurusPort = Number(process.env.DOCUSAURUS_INTERNAL_PORT || 3002);
const runnerPort = Number(process.env.RECIPE_RUNNER_PORT || 3001);

const sharedEnv = {
  ...loadEnvFile(path.join(siteDir, '.env')),
  ...loadEnvFile(path.join(siteDir, '..', '.env')),
  ...process.env,
};

let runner = null;
let docusaurus = null;
let shuttingDown = false;

const proxy = httpProxy.createProxyServer({
  ws: true,
  xfwd: true,
});

function isBackendRoute(url) {
  return Boolean(url && (url.startsWith('/run-recipe') || url.startsWith('/generate-wrangle-catalog')));
}

function getForwardedUrl(port, pathname = '/') {
  const codespaceName = process.env.CODESPACE_NAME;
  const forwardingDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev';

  if (codespaceName) {
    return `https://${codespaceName}-${port}.${forwardingDomain}${pathname}`;
  }

  return `http://127.0.0.1:${port}${pathname}`;
}

proxy.on('error', (error, req, res) => {
  console.error('[dev-proxy] Proxy error:', error.message);
  if (res && typeof res.writeHead === 'function' && !res.headersSent) {
    res.writeHead(502, {'Content-Type': 'application/json; charset=utf-8'});
  }
  if (res && typeof res.end === 'function') {
    res.end(JSON.stringify({error: `Proxy error: ${error.message}`}));
  } else if (res && typeof res.destroy === 'function') {
    res.destroy();
  }
});

proxy.on('proxyReq', (proxyReq, req) => {
  if (isBackendRoute(req.url)) {
    console.log(`[dev-proxy] Forwarding ${req.method} ${req.url} -> host=${proxyReq.getHeader('host')} path=${proxyReq.path}`);
  }
});

proxy.on('proxyRes', (proxyRes, req) => {
  if (isBackendRoute(req.url)) {
    console.log(`[dev-proxy] Response ${proxyRes.statusCode} for ${req.method} ${req.url}`);
  }
});

const server = http.createServer((req, res) => {
  const target = isBackendRoute(req.url)
    ? `http://127.0.0.1:${runnerPort}`
    : `http://127.0.0.1:${docusaurusPort}`;

  if (isBackendRoute(req.url)) {
    console.log(`[dev-proxy] Incoming ${req.method} ${req.url} target=${target}`);
  }

  proxy.web(req, res, {target});
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head, {target: `ws://127.0.0.1:${docusaurusPort}`});
});

server.on('error', (error) => {
  console.error(`[dev-proxy] Failed to bind port ${publicPort}: ${error.message}`);
  shutdown(1);
});

function killChild(child) {
  if (child && !child.killed) {
    child.kill('SIGTERM');
  }
}

function shutdown(code = 0) {
  if (shuttingDown) {
    return;
  }
  shuttingDown = true;

  killChild(runner);
  killChild(docusaurus);

  server.close(() => {
    process.exit(code);
  });

  setTimeout(() => {
    killChild(runner);
    killChild(docusaurus);
    process.exit(code);
  }, 1000).unref();
}

function spawnChildren() {
  runner = spawn(process.execPath, [path.join(__dirname, 'recipe-runner-server.cjs')], {
    cwd: siteDir,
    env: {
      ...sharedEnv,
      RECIPE_RUNNER_PORT: String(runnerPort),
    },
    stdio: 'inherit',
  });

  docusaurus = spawn(
    process.execPath,
    [
      path.join(siteDir, 'node_modules', '@docusaurus', 'core', 'bin', 'docusaurus.mjs'),
      'start',
      '--host',
      '127.0.0.1',
      '--port',
      String(docusaurusPort),
    ],
    {
      cwd: siteDir,
      env: {
        ...sharedEnv,
        NODE_OPTIONS: [
          sharedEnv.NODE_OPTIONS,
          '--require',
          './scripts/os-network-interfaces-polyfill.cjs',
        ]
          .filter(Boolean)
          .join(' '),
      },
      stdio: 'inherit',
    },
  );

  runner.on('exit', (code) => {
    if (!shuttingDown && code) {
      console.error(`[start-dev] Recipe runner exited with code ${code}`);
      shutdown(code);
    }
  });

  docusaurus.on('exit', (code) => {
    if (!shuttingDown) {
      shutdown(code || 0);
    }
  });
}

server.listen(publicPort, '0.0.0.0', () => {
  console.log(`[dev-proxy] Listening on http://0.0.0.0:${publicPort}`);
  console.log(`[dev-proxy] Public URL -> ${getForwardedUrl(publicPort, '/')}`);
  console.log(`[dev-proxy] Playground -> ${getForwardedUrl(publicPort, '/playground')}`);
  console.log(`[dev-proxy] Docusaurus -> http://127.0.0.1:${docusaurusPort}`);
  console.log(`[dev-proxy] Recipe runner -> http://127.0.0.1:${runnerPort}`);
  spawnChildren();
});

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
