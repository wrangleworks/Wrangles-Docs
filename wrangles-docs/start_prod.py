import json
import mimetypes
import os
import subprocess
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

SITE_DIR = Path(__file__).resolve().parent
BUILD_DIR = SITE_DIR / 'build'
PORT = int(os.environ.get('PORT', '3000'))
RUN_RECIPE = SITE_DIR / 'run_recipe.py'


def create_request_id():
    import time
    import random

    return f"prod-{int(time.time() * 1000):x}-{random.randint(0, 0xFFFFFF):06x}"


def preview_text(value, limit=220):
    if not value:
        return ''

    normalized = ' '.join(str(value).split())
    return f"{normalized[:limit]}..." if len(normalized) > limit else normalized


def extract_runner_error(*streams):
    for stream in streams:
        text = stream.decode('utf-8', errors='replace') if isinstance(stream, bytes) else str(stream or '')
        for line in reversed([item.strip() for item in text.splitlines() if item.strip()]):
            try:
                parsed = json.loads(line)
            except json.JSONDecodeError:
                continue

            if isinstance(parsed, dict) and parsed.get('error'):
                return parsed['error']

    for stream in streams:
        text = stream.decode('utf-8', errors='replace') if isinstance(stream, bytes) else str(stream or '')
        if text.strip():
            return text.strip()

    return 'Recipe runner failed.'


class AppHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BUILD_DIR), **kwargs)

    def do_OPTIONS(self):
        if self.path == '/run-recipe':
            request_id = self.headers.get('X-Recipe-Request-Id', create_request_id())
            print(f'[prod-server:{request_id}] OPTIONS {self.path}')
            self.send_response(204)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type, X-Recipe-Request-Id')
            self.end_headers()
            return

        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        pathname = urlparse(self.path).path
        if pathname == '/healthz':
            print('[prod-server] GET /healthz')
            self._send_json(200, {'ok': True})
            return
        self._serve_static(pathname, head_only=False)

    def do_HEAD(self):
        pathname = urlparse(self.path).path
        if pathname == '/healthz':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            return
        self._serve_static(pathname, head_only=True)

    def do_POST(self):
        request_id = self.headers.get('X-Recipe-Request-Id', create_request_id())
        pathname = urlparse(self.path).path
        print(f'[prod-server:{request_id}] POST {pathname}')
        if pathname != '/run-recipe':
            print(f'[prod-server:{request_id}] Rejected POST route {pathname}')
            self._send_json(404, {'error': 'Not found'}, request_id=request_id)
            return

        content_length = int(self.headers.get('Content-Length', '0'))
        payload = self.rfile.read(content_length)
        print(
            f'[prod-server:{request_id}] Payload received',
            {
                'bytes': content_length,
                'preview': preview_text(payload.decode('utf-8', errors='replace')),
            },
        )

        process = subprocess.run(
            [sys.executable, str(RUN_RECIPE)],
            input=payload,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            cwd=str(SITE_DIR),
        )

        if process.returncode == 0:
            raw = process.stdout or b'{}'
            try:
                response = json.loads(raw.decode('utf-8'))
            except json.JSONDecodeError:
                print(f'[prod-server:{request_id}] Invalid JSON from runner', preview_text(raw.decode('utf-8', errors='replace')))
                self._send_json(500, {'error': raw.decode('utf-8', errors='replace')}, request_id=request_id)
                return
            print(
                f'[prod-server:{request_id}] Runner completed',
                {
                    'outputColumns': response.get('columns', []),
                    'outputRowCount': len(response.get('rows', [])),
                },
            )
            self._send_json(200, response, request_id=request_id)
            return

        message = extract_runner_error(process.stderr, process.stdout)

        print(f'[prod-server:{request_id}] Runner failed', {
            'stderr': preview_text(process.stderr.decode('utf-8', errors='replace')),
            'stdout': preview_text(process.stdout.decode('utf-8', errors='replace')),
            'message': message,
        })
        self._send_json(500, {'error': message}, request_id=request_id)

    def translate_path(self, path):
        pathname = urlparse(path).path
        cleaned = pathname.lstrip('/') or 'index.html'
        return str(BUILD_DIR / cleaned)

    def log_message(self, format, *args):
        sys.stderr.write('%s - - [%s] %s\n' % (self.address_string(), self.log_date_time_string(), format % args))

    def _serve_static(self, pathname, *, head_only):
        relative = pathname.lstrip('/') or 'index.html'
        candidate = BUILD_DIR / relative
        if candidate.is_dir():
            candidate = candidate / 'index.html'
        if not candidate.exists() or not candidate.is_file():
            candidate = BUILD_DIR / 'index.html'

        if not candidate.exists():
            print(f'[prod-server] Static build not found for {pathname}')
            self._send_json(500, {'error': 'Static build not found'})
            return

        content_type = mimetypes.guess_type(str(candidate))[0] or 'application/octet-stream'
        data = candidate.read_bytes()

        self.send_response(200)
        self.send_header('Content-Type', f'{content_type}; charset=utf-8' if content_type.startswith('text/') or content_type in {'application/javascript', 'application/json'} else content_type)
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()

        if not head_only:
            self.wfile.write(data)

    def _send_json(self, status_code, payload, request_id=''):
        data = json.dumps(payload).encode('utf-8')
        self.send_response(status_code)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, X-Recipe-Request-Id')
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(data)))
        if request_id:
            self.send_header('X-Recipe-Request-Id', request_id)
        self.end_headers()
        self.wfile.write(data)


if __name__ == '__main__':
    server = ThreadingHTTPServer(('0.0.0.0', PORT), AppHandler)
    print(f'[prod-server] Listening on http://0.0.0.0:{PORT}')
    print(f'[prod-server] Static build -> {BUILD_DIR}')
    print(f'[prod-server] Recipe runner -> {RUN_RECIPE}')
    server.serve_forever()
