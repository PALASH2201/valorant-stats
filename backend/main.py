from flask import request, jsonify
from config import app, db
from models import User
from sqlalchemy.exc import IntegrityError
import sqlite3
# from werkzeug.security import generate_pasword_hash, check_password_hash
import requests

@app.route('/register', methods=['GET', 'POST'])
def register():
    data = request.json
    username = data["username"]
    email = data["email"]
    password = data["password"]

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
    elif not user.password == password:
        return (
            jsonify({"message": 'Password incorrect, please try again.'}),
            400
        )
    else:
        return (
            jsonify({"message": "Successfully Logged In!"}),
            201,
        )

@app.route('/agents', methods=['GET'])
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

if __name__=='__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)