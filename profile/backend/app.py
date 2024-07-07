
from flask import Flask, request, jsonify, send_file
from linkedin_api import Linkedin
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Ensure the 'static' directory exists
if not os.path.exists('static'):
    os.makedirs('static')

# Function to get LinkedIn profile data
def get_linkedin_profile(email, password, profile_name):
    try:
        api = Linkedin(email, password)
        profile_data = api.get_profile(profile_name)
        return profile_data
    except Exception as e:
        return {"error": str(e)}

@app.route('/fetch_profile', methods=['POST'])
def fetch_profile():
    data = request.json
    email = "theronecreation@gmail.com"  # Replace with your LinkedIn email
    password = "qwerty@123"  # Replace with your LinkedIn password
    profile_name = data['username']

    profile_data = get_linkedin_profile(email, password, profile_name)

    if 'error' in profile_data:
        return jsonify(profile_data)

    # Save profile data as JSON file
    file_path = os.path.join('static', f"{profile_name}_profile.json")
    with open(file_path, 'w') as json_file:
        json.dump(profile_data, json_file)

    return jsonify({"profile_data": profile_data, "json_path": file_path})

@app.route('/download_json/<filename>')
def download_json(filename):
    file_path = os.path.join('static', filename)
    return send_file(file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
