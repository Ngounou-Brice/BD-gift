from http.server import BaseHTTPRequestHandler
import json

SECRET_CODE = "18"

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

        if self.path == '/api/unlock':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            name = data.get("name")
            code = data.get("code")

            if code.lower() == SECRET_CODE:
                response = {
                    "status": "success",
                    "message": f"Happy Birthday {name} ❤️",
                    "letter": f"""
 My Dearest {name} ❤️,

Today marks not just the passing of time, but the celebration of a truly remarkable soul.

From the moments we’ve shared growing up, to the strength and beauty you continue to show every day, you have been nothing short of a blessing in my life.

As you step into this new age, I want you to remember how special you are not just to me, but to everyone fortunate enough to know you.

May this new chapter bring you closer to your dreams, fill your heart with peace, and surround you with endless love and happiness.

Never stop being the amazing person you are.

Happy Birthday, my lovely sister 🎂✨

With all my love,
Your brother Brice 💖
"""
                }
            else:
                self.send_response(401)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {"status": "error"}
            
            self.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()