import http.server
import socketserver
import mimetypes
import os

PORT = 8080

# FORCE correct MIME type for modules
mimetypes.init()
mimetypes.add_type('application/javascript', '.js')

class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = http.server.SimpleHTTPRequestHandler.extensions_map.copy()
    extensions_map.update({
        '': 'application/octet-stream',
        '.js': 'application/javascript', # Ensure this is set
        '.css': 'text/css',
        '.html': 'text/html',
    })

    def end_headers(self):
        # Add CORS headers just in case
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

print(f"Serving at http://localhost:{PORT} with explicit JS MIME types")
print(f"Use http://<YOUR_IP>:{PORT} on mobile")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
