from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

SECRET_CODE = "18"

@app.route("/api/unlock", methods=["POST"])
def unlock():
    data = request.json
    name = data.get("name")
    code = data.get("code")

    if code.lower() == SECRET_CODE:
        return jsonify({
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
        })
    return jsonify({"status": "error"}), 401

if __name__ == "__main__":
    app.run(debug=True)