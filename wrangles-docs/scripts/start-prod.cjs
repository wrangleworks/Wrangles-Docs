const fs = require('fs');
const http = require('http');
const path = require('path');
const {spawn} = require('child_process');
const httpProxy = require('http-proxy');

const siteDir = path.resolve(__dirname, '..');
const buildDir = path.join(siteDir, 'build');
const publicPort = Number(process.env.PORT || 3000);
const runnerPort = Number(process.env.RECIPE_RUNNER_PORT || 3001);

let runner = null;
let shuttingDown = false;

function contentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  switch (extension) {
    case '.css':
      return 'text/css; charset=utf-8';
    case '.js':
      return 'application/javascript; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.ico':
      return 'image/x-icon';
    case '.txt':
      return 'text/plain; charset=utf-8';
    case '.xml':
      return 'application/xml; charset=utf-8';
    case '.html':
    default:
      return 'text/html; charset=utf-8';
  }
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {'Content-Type': 'application/json; charset=utf-8'});
  response.end(JSON.stringify(payload));
}

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

  server.close(() => {
    process.exit(code);
  });

  setTimeout(() => {
    killChild(runner);
    process.exit(code);
  }, 1000).unref();
}

function safePathname(rawUrl) {
  const requestUrl = new URL(rawUrl || '/', 'http://localhost');
  return decodeURIComponent(requestUrl.pathname);
}

function serveFile(request, response) {
  const pathname = safePathname(request.url);
  const relativePath = pathname === '/' ? '/index.html' : pathname;
  const requestedPath = path.normalize(relativePath).replace(/^([.][.][\/\\])+/, '');

  let filePath = path.join(buildDir, requestedPath);
  if (!filePath.startsWith(buildDir)) {
    sendJson(response, 400, {error: 'Invalid path'});
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    filePath = path.join(buildDir, 'index.html');
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      sendJson(response, 500, {error: 'Failed to read static file'});
      return;
    }

    response.writeHead(200, {'Content-Type': contentType(filePath)});
    response.end(data);
  });
}

const proxy = httpProxy.createProxyServer({
  xfwd: true,
});

proxy.on('error', (error, req, res) => {
  console.error('[prod-server] Proxy error:', error.message);
  if (res && !res.headersSent) {
    res.writeHead(502, {'Content-Type': 'application/json; charset=utf-8'});
  }
  if (res) {
    res.end(JSON.stringify({error: `Proxy error: ${error.message}`}));
  }
});

const server = http.createServer((request, response) => {
  const pathname = safePathname(request.url);

  if (pathname === '/healthz') {
    sendJson(response, 200, {ok: true});
    return;
  }

  if (pathname.startsWith('/run-recipe')) {
    proxy.web(request, response, {target: `http://127.0.0.1:${runnerPort}`});
    return;
  }

  serveFile(request, response);
});

server.on('error', (error) => {
  console.error(`[prod-server] Failed to bind port ${publicPort}: ${error.message}`);
  shutdown(1);
});

function startRunner() {
  runner = spawn(process.execPath, [path.join(__dirname, 'recipe-runner-server.cjs')], {
    cwd: siteDir,
    env: {
      ...process.env,
      RECIPE_RUNNER_PORT: String(runnerPort),
    },
    stdio: 'inherit',
  });

  runner.on('exit', (code) => {
    if (!shuttingDown && code) {
      console.error(`[prod-server] Recipe runner exited with code ${code}`);
      shutdown(code);
    }
  });
}

server.listen(publicPort, '0.0.0.0', () => {
  console.log(`[prod-server] Listening on http://0.0.0.0:${publicPort}`);
  console.log(`[prod-server] Static build -> ${buildDir}`);
  console.log(`[prod-server] Recipe runner -> http://127.0.0.1:${runnerPort}`);
  startRunner();
});

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
