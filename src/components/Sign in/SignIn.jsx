import React from 'react';
import './SignIn.css';
import skyeImage from '../../assets/Skye_artwork.png'; 
import logo from '../../assets/V_Lockup_Vertical_Navy.png';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
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
                    src={skyeImage}
                    alt="Valorant Character"
                    className="character-image"
                />
            </div>
            <div className="form-section">
                <h2 className='signin-text'>Sign In</h2>
                <form className="signup-form">
                    <input type="text" placeholder="Username" className="input-field" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input-field"
                    />
                    <button type="submit" className="signup-button" style={{fontFamily:'Tungsten', letterSpacing:'2px'}}>
                        Sign In
                    </button>
                </form>
                <p className="signup-text" style={{ marginTop: '10px', fontSize:'2rem'}}>
                    Don't Have An Account? <a href="/signup">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
