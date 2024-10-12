from flask import request, jsonify
from config import app, db
from models import User
from sqlalchemy.exc import IntegrityError
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token
import requests
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

def verify_google_token_with_endpoint(token):
    response = requests.get(f"https://oauth2.googleapis.com/tokeninfo?id_token={token}")

    if response.status_code != 200:
        raise ValueError('Token verification failed')

    return response.json()

@app.route('/google-login', methods = ['GET', 'POST'])
def google_login():
    data = request.json
    credential = data.get('credential')
    # print(credential)

    if not credential:
        return jsonify({"error": "Missing credential"}), 400

    try:
        # Verify the token using Google's libraries
        id_info = verify_google_token_with_endpoint(credential)

        # Validate the client_id
        if id_info['aud'] != "664359618308-c4ne7t8db9vecfu317rmjd4fb0rkkj15.apps.googleusercontent.com":
            raise ValueError('Could not verify audience.')

        user_id = id_info.get("sub")
        email = id_info.get("email")
        name = id_info.get("name")
        print(name)
        access_token = create_access_token(identity={"username": name, "email": email})
        refresh_token = create_refresh_token(identity={"username": name, "email": email})
        print(access_token)
        print(refresh_token)

        return (
            jsonify({"message": "Successfully Logged In!", "access_token": access_token, "refresh_token": refresh_token}),
            201,
        )
    except ValueError:
        # Invalid token
        return jsonify({"error": "Invalid token"}), 400

@app.route('/register', methods=['GET', 'POST'])
def register():
    data = request.json
    username = data["username"]
    email = data["email"]
    password = generate_password_hash(data["password"], method='pbkdf2:sha256', salt_length=8)

    if not username or not email or not password:
        return (
            jsonify({"message": "You must include a username, password and email"}),
            400,
        )
    
    new_user = User(username=username, password=password, email=email)
    try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'message': 'A user with the same email ID already exists.'}), 400
    except Exception as e:
        return (
            jsonify({"message": str(e)}),
            400,
        )
    
    return (
        jsonify({"message": "User created!"}),
        201,
    )

@app.route('/login', methods=['GET', 'POST'])
def login():
    data = request.json
    email = data["email"]
    password = data["password"]

    if not email or not password:
        return (
            jsonify({"message": "You must include a password and email"}),
            400,
        )
    # Find user by email entered.
    user = db.session.execute(db.select(User).where(User.email == email)).scalar()
    if not user:
        return (
            jsonify({"message": "That email does not exist, please try again."}),
            400
        )
    if not check_password_hash(user.password, password):
        return (
            jsonify({"message": 'Password incorrect, please try again.'}),
            400
        )
    
     # Create JWT token
    access_token = create_access_token(identity={"username": user.username, "email": user.email})
    refresh_token = create_refresh_token(identity={"username": user.username, "email": user.email})

    return (
        jsonify({"message": "Successfully Logged In!", "access_token": access_token, "refresh_token": refresh_token}),
        201,
    )

@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)  # Require the refresh token
def refresh():
    # Get the identity (username/email) from the refresh token
    current_user = get_jwt_identity()

    # Create a new access token
    new_access_token = create_access_token(identity=current_user)

    return jsonify({
        "access_token": new_access_token
    }), 200

@app.route('/agents', methods=['GET'])
@jwt_required()
def agents_list():
    response = requests.get("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
    agents = response.json()['data']
    agents_info = []
    for agent in agents:
        info = {
                "displayName": agent["displayName"],
                "description": agent["description"],
                "displayIcon": agent["displayIcon"],
                "fullPortrait": agent["fullPortrait"],
                "is_role": True if agent["role"] else False,
                "abilities": agent["abilities"]
            }
        if info["is_role"]:
            info["role"] = agent["role"]["displayName"]
            info["role_icon"] = agent["role"]["displayIcon"]
        agents_info.append(info)
        print(info["displayName"])
    
    
    return jsonify({"agents": agents_info})

@app.route('/agents/<string:name>', methods=['GET'])
@jwt_required()
def get_agent_by_name(name):
    response = requests.get("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
    agents = response.json()['data']
    
    # Search for the agent with the given name (case-insensitive)
    for agent in agents:
        
        if agent['displayName'].lower() == name.lower():
            info = {
                "displayName": agent["displayName"],
                "description": agent["description"],
                "displayIcon": agent["displayIcon"],
                "fullPortrait": agent["fullPortrait"],
                "is_role": True if agent["role"] else False,
                "abilities": agent["abilities"]
            }
            if info["is_role"]:
                info["role"] = agent["role"]["displayName"]
                info["role_icon"] = agent["role"]["displayIcon"]

            return jsonify(info), 200
    
    # If no agent is found, return a 404 response
    return jsonify({"message": "Agent not found"}), 404 

PLAYER_CARD_API_URL = "https://valorant-api.com/v1/playercards/{card_id}"
# Function to get card image using card ID
def get_card_image(card_id):
    try:
        response = requests.get(PLAYER_CARD_API_URL.format(card_id=card_id))
        if response.status_code == 200:
            card_data = response.json()
            return card_data.get("data", {}).get("displayIcon", None)
        else:
            return None
    except Exception as e:
        print(f"Error fetching card image: {str(e)}")
        return None

# API route to receive player objects and fetch card images
@app.route('/leaderboard', methods=['POST'])
@jwt_required()
def leaderboard_with_cards():
    # Step 1: Get the player objects from the request body
    players = request.json.get('players', [])
    
    # Step 2: Iterate through each player and fetch their card image
    cardImageArray = []
    for player in players:
        card_id = player.get('card')
        if card_id:
            card_image = get_card_image(card_id)
        cardImageArray.append(card_image)

    # Step 3: Return the combined player data with card images as JSON
    return jsonify(cardImageArray)

if __name__=='__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)