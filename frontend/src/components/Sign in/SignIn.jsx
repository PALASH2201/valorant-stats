import React from 'react';
import './signin.css';
import {useState, useEffect} from "react";
import skyeImage from '../../assets/Skye_artwork.png'; 
import logo from '../../assets/V_Lockup_Vertical_Navy.png';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const SignIn = () => {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    // If user is already logged in, redirect to home
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            navigate('/home');
        }
    }, [navigate]);

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
        const response_data = await response.json()
        if(response.status !== 201 && response.status !== 200) {
            alert(response_data.message)
        } else {
            // Store the JWT token in localStorage
            localStorage.setItem('access_token', response_data.access_token)
            localStorage.setItem("refresh_token", response_data.refresh_token);
            navigate('/home')
        }

    }

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const data = { credential: credentialResponse.credential };

        // const data = { credential };  // Wrap the credential in an object to send as JSON

        const url = "http://127.0.0.1:5000/google-login"; // Your Flask backend endpoint
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        };

        const res = await fetch(url, options);
        const response_data = await res.json();
        if (res.status === 200 || res.status === 201) {
            // If the backend response is successful, navigate to the home page
            localStorage.setItem('access_token', response_data.access_token)
            localStorage.setItem("refresh_token", response_data.refresh_token);
            navigate('/home');
        } else {
            // Handle errors (e.g., show a notification)
            console.error("Login failed");
            alert(response_data.message)
        }
    };

    const handleGoogleLoginError = () => {
        console.log('Login Failed');
    };

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
                <div className="google-login-container">
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                    />
                </div>
                <p className="signup-text" style={{ marginTop: '10px', fontSize:'1.3rem'}}>
                    Don't Have An Account? <a href="/signup" style={{color: '#007bff'}}>Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
