#!/usr/bin/env python3
"""Serve the static portfolio locally, including its existing extensionless URLs."""
import argparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from functools import partial

class PortfolioHandler(SimpleHTTPRequestHandler):
    fail_models = False

    def do_GET(self):
        if self.fail_models and self.path.split('?')[0].endswith('.glb'):
            self.send_error(503, 'Intentional local model-failure test')
            return
        super().do_GET()

    def translate_path(self, path):
        resolved = Path(super().translate_path(path))
        if not resolved.exists() and not resolved.suffix:
            html = resolved.with_suffix('.html')
            if html.is_file():
                return str(html)
        return str(resolved)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=4186)
    parser.add_argument('--fail-models', action='store_true', help='Local fallback verification only')
    args = parser.parse_args()
    PortfolioHandler.fail_models = args.fail_models
    root = Path(__file__).resolve().parent.parent
    server = ThreadingHTTPServer(('127.0.0.1', args.port), partial(PortfolioHandler, directory=str(root)))
    print(f'Portfolio preview: http://127.0.0.1:{args.port}', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
