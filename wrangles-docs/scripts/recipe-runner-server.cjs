const fs = require('fs');
const http = require('http');
const path = require('path');
const {spawn} = require('child_process');

const host = process.env.RECIPE_RUNNER_HOST || '127.0.0.1';
const port = Number(process.env.RECIPE_RUNNER_PORT || 3001);
const siteDir = path.resolve(__dirname, '..');
const runnerPath = path.join(siteDir, 'run_recipe.py');
const catalogGeneratorPath = path.join(siteDir, 'scripts', 'generate-wrangle-catalog.cjs');
const venvPythonPath = path.join(siteDir, '.venv', 'bin', 'python');
const pythonCommand = process.env.WRANGLES_RUNNER_PYTHON || (fs.existsSync(venvPythonPath) ? venvPythonPath : 'python3');

function createRequestId() {
  return `runner-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function previewText(value, limit = 220) {
  if (!value) {
    return '';
  }

  const normalized = String(value).replace(/\s+/g, ' ').trim();
  return normalized.length > limit ? `${normalized.slice(0, limit)}...` : normalized;
}

function extractRunnerError(...streams) {
  for (const stream of streams) {
    const lines = String(stream || '')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .reverse();

    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        if (parsed && typeof parsed === 'object' && parsed.error) {
          return parsed.error;
        }
      } catch (_error) {
        // Keep scanning for the JSON error line emitted by run_recipe.py.
      }
    }
  }

  return streams.map((stream) => String(stream || '').trim()).find(Boolean) || 'Recipe runner failed.';
}

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

const fileEnv = {
  ...loadEnvFile(path.join(siteDir, '.env')),
  ...loadEnvFile(path.join(siteDir, '..', '.env')),
};

const runnerEnv = {
  ...fileEnv,
  ...process.env,
};

function writeJson(response, statusCode, payload, requestId) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Recipe-Request-Id',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Recipe-Request-Id': requestId,
  });
  response.end(JSON.stringify(payload));
}

function logRunnerFailure({requestId, payload, stdout, stderr, message}) {
  console.error(`[recipe-runner:${requestId}] Request failed`);
  console.error(`[recipe-runner:${requestId}] Recipe preview:`);
  console.error((payload.recipe || '').split('\n').slice(0, 12).join('\n'));
  if (stderr.trim()) {
    console.error(`[recipe-runner:${requestId}] Python stderr:`);
    console.error(stderr.trim());
  }
  if (stdout.trim()) {
    console.error(`[recipe-runner:${requestId}] Python stdout:`);
    console.error(stdout.trim());
  }
  console.error(`[recipe-runner:${requestId}] Response message: ${message}`);
}

function runRecipe(payload, requestId) {
  return new Promise((resolve, reject) => {
    console.log(`[recipe-runner:${requestId}] Spawning python runner`, {
      inputColumns: payload.input?.columns || [],
      inputRowCount: payload.input?.rows?.length || 0,
      outputColumns: payload.outputColumns || [],
      recipePreview: previewText(payload.recipe, 160),
    });

    const child = spawn(pythonCommand, [runnerPath], {
      cwd: siteDir,
      env: runnerEnv,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (error) => {
      reject(new Error(`Failed to start python runner: ${error.message}`));
    });

    child.on('close', (code) => {
      if (code === 0) {
        try {
          const parsed = JSON.parse(stdout);
          console.log(`[recipe-runner:${requestId}] Python runner completed`, {
            outputColumns: parsed.columns || [],
            outputRowCount: parsed.rows?.length || 0,
          });
          resolve(parsed);
        } catch (error) {
          const message = `Recipe runner returned invalid JSON: ${stdout || error.message}`;
          logRunnerFailure({requestId, payload, stdout, stderr, message});
          reject(new Error(message));
        }
        return;
      }

      const message = extractRunnerError(stderr, stdout) || `Recipe runner exited with code ${code}`;

      logRunnerFailure({requestId, payload, stdout, stderr, message});
      reject(new Error(message));
    });

    child.stdin.write(JSON.stringify(payload));
    child.stdin.end();
  });
}

function runCatalogGenerator(requestId) {
  return new Promise((resolve, reject) => {
    console.log(`[recipe-runner:${requestId}] Regenerating wrangle catalog`);

    const child = spawn(process.execPath, [catalogGeneratorPath], {
      cwd: siteDir,
      env: runnerEnv,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (error) => {
      reject(new Error(`Failed to start catalog generator: ${error.message}`));
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`[recipe-runner:${requestId}] Catalog generator completed: ${previewText(stdout)}`);
        resolve({message: stdout.trim() || 'Wrangle catalog regenerated.'});
        return;
      }

      const message = stderr.trim() || stdout.trim() || `Catalog generator exited with code ${code}`;
      console.error(`[recipe-runner:${requestId}] Catalog generator failed: ${message}`);
      reject(new Error(message));
    });
  });
}

const server = http.createServer((request, response) => {
  const requestId = request.headers['x-recipe-request-id'] || createRequestId();
  console.log(`[recipe-runner:${requestId}] Incoming request ${request.method} ${request.url}`);

  if (request.method === 'OPTIONS') {
    writeJson(response, 204, {}, requestId);
    return;
  }

  if (request.method === 'POST' && request.url === '/generate-wrangle-catalog') {
    runCatalogGenerator(requestId)
      .then((payload) => writeJson(response, 200, payload, requestId))
      .catch((error) => {
        console.error(`[recipe-runner:${requestId}] Catalog update failed:`, error.message);
        writeJson(response, 500, {error: error.message}, requestId);
      });
    return;
  }

  if (request.method !== 'POST' || request.url !== '/run-recipe') {
    console.warn(`[recipe-runner:${requestId}] Rejected request`, {
      method: request.method,
      url: request.url,
    });
    writeJson(response, 404, {error: 'Not found'}, requestId);
    return;
  }

  let body = '';
  request.on('data', (chunk) => {
    body += chunk.toString();
  });

  request.on('end', async () => {
    console.log(`[recipe-runner:${requestId}] Raw body received`, {
      bytes: Buffer.byteLength(body || '', 'utf8'),
      preview: previewText(body),
    });

    try {
      const payload = JSON.parse(body || '{}');
      const result = await runRecipe(payload, requestId);
      writeJson(response, 200, result, requestId);
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(`[recipe-runner:${requestId}] Invalid JSON body`, {
          preview: previewText(body),
        });
        writeJson(response, 400, {error: 'Invalid JSON request body.'}, requestId);
        return;
      }

      console.error(`[recipe-runner:${requestId}] HTTP request failed:`, error.message);
      writeJson(response, 500, {error: error.message}, requestId);
    }
  });

  request.on('error', (error) => {
    console.error(`[recipe-runner:${requestId}] Request stream error:`, error.message);
    if (!response.headersSent) {
      writeJson(response, 500, {error: `Request stream error: ${error.message}`}, requestId);
    }
  });
});

server.listen(port, host, () => {
  console.log(`Recipe runner listening on http://${host}:${port}`);
});
