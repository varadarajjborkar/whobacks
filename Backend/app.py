from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pandas as pd
import json

# Initialize the Flask app
app = Flask(__name__)
CORS(app,resources={r"/*":{"origins":"*"}})  # Enable CORS for all routes

app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Define your routes
@app.route('/upload', methods=['POST'])
def upload_files():
    if 'followers_file' not in request.files or 'following_file' not in request.files:
        return jsonify({"error": "Please upload both files!"}), 400

    followers_file = request.files['followers_file']
    following_file = request.files['following_file']

    # Save files temporarily
    followers_path = os.path.join(app.config['UPLOAD_FOLDER'], followers_file.filename)
    following_path = os.path.join(app.config['UPLOAD_FOLDER'], following_file.filename)

    followers_file.save(followers_path)
    following_file.save(following_path)

    # Convert JSON files to CSV
    if followers_path.endswith('.json'):
        followers_path = extract_usernames_from_json(followers_path)
    if following_path.endswith('.json'):
        following_path = extract_usernames_from_json(following_path)

    # Process CSV files
    followers = pd.read_csv(followers_path, header=None).squeeze()
    following = pd.read_csv(following_path, header=None).squeeze()

    not_following_back = set(following) - set(followers)
    not_followed_by = set(followers) - set(following)

    # Return the result as JSON
    return jsonify({
        'not_following_back': list(not_following_back),
        'not_followed_by': list(not_followed_by)
    })


def extract_usernames_from_json(filepath):
    """
    Extract usernames from JSON file and save as a CSV.
    Returns the path to the converted CSV file.
    """
    csv_path = filepath.replace('.json', '.csv')

    with open(filepath, 'r') as f:
        data = json.load(f)

    # Handle the JSON structure for followers and following files
    if isinstance(data, list):  # Followers file
        usernames = [item['string_list_data'][0]['value'] for item in data if 'string_list_data' in item]
    elif isinstance(data, dict) and 'relationships_following' in data:  # Following file
        usernames = [item['string_list_data'][0]['value'] for item in data['relationships_following'] if 'string_list_data' in item]
    else:
        raise ValueError("Invalid JSON structure")

    # Save usernames to CSV
    pd.DataFrame(usernames, columns=['username']).to_csv(csv_path, index=False, header=False)
    return csv_path


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Render provides the PORT environment variable
    app.run(host='0.0.0.0', port=port, debug=True)
