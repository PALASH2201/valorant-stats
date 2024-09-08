import React from 'react';
import './signin.css';
import {useState} from "react";
import skyeImage from '../../assets/Skye_artwork.png'; 
import logo from '../../assets/V_Lockup_Vertical_Navy.png';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            email,
            password,
        }
        const url = "http://127.0.0.1:5000/login" 
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if(response.status !== 201 && response.status !== 200) {
            const response_data = await response.json()
            alert(response_data.message)
        } else {
            navigate('/home')
        }

    }

    return (
        <div className="signup-container">
            <div className="trapezium-red"/>
            <div style={{position: 'absolute', zIndex: 2}} className="logo-section">
                <div className="logo-container">
                <img
                    src={logo}
                    alt="Valorant Logo"
                    className="logo-image"
                />
                </div>
            </div>
            <div style={{position: 'absolute', zIndex: 2}} className="image-section">
                <img
                    src={skyeImage}
                    alt="Valorant Character"
                    className="character-image"
                />
            </div>
            <div style={{position: 'relative', zIndex: 3}} className="form-section">
                <h2 className='signin-text'>Sign In</h2>
                <form className="signup-form" onSubmit={onSubmit}>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input-field" />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="input-field"
                    />
                    <button type="submit" className="signup-button" style={{fontFamily:'Tungsten', letterSpacing:'2px'}}>
                        Sign In
                    </button>
                </form>
                <p className="signup-text" style={{ marginTop: '10px', fontSize:'1.3rem'}}>
                    Don't Have An Account? <a href="/signup">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
