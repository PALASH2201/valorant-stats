from flask import request, jsonify
from config import app, db
from models import User
from sqlalchemy.exc import IntegrityError
import sqlite3
# from werkzeug.security import generate_pasword_hash, check_password_hash

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


if __name__=='__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)