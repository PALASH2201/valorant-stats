import React from 'react';
import './SignUp.css';
import cypherImage from '../../assets/Cypher_artwork.png'; 
import logo from '../../assets/V_Lockup_Vertical_Navy.png';

const SignUp = () => {
    return (
        <div className="signup-container">
            <div className="logo-section">
                <div className="logo-container">
                <img
                    src={logo}
                    alt="Valorant Logo"
                    className="logo-image"
                />
                </div>
            </div>
            <div className="image-section">
                <img
                    src={cypherImage}
                    alt="Valorant Character"
                    className="character-image"
                />
            </div>
            <div className="form-section">
                <h2>Sign Up</h2>
                <form className="signup-form">
                    <input type="text" placeholder="Username" className="input-field" />
                    <input type="email" placeholder="Email" className="input-field" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input-field"
                    />
                    <button type="submit" className="signup-button">
                        Create Account
                    </button>
                </form>
                <p className="login-text">
                    Already Have An Account? <a href="/signin">Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
