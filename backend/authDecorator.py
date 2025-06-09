from functools import wraps
from flask import request, jsonify

def firebase_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Missing or invalid token"}), 401
        
        token = auth_header.split(" ")[1]
        try:
            decoded = firebase_auth.verify_id_token(token)
            request.firebase_uid = decoded["uid"]
        except Exception as e:
            print("Invalid Firebase token:", e)
            return jsonify({"error": "Unauthorized"}), 401

        return f(*args, **kwargs)
    return wrapper
