import React from 'react';
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import './signup.css';
import cypherImage from '../../assets/Cypher_artwork.png'; 
import logo from '../../assets/V_Lockup_Vertical_Navy.png';

const SignUp = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            username,
            email,
            password,
        }
        const url = "http://127.0.0.1:5000/register" 
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
                    src={cypherImage}
                    alt="Valorant Character"
                    className="character-image"
                />
            </div>
            <div className="form-section">
                <h2 className='signup-text'>Sign Up</h2>
                <form className="signup-form" onSubmit={onSubmit}>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="input-field" />
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
                        Create Account
                    </button>
                </form>
                <p className="signin-text" style={{ marginTop: '20px' , fontSize:'1.3rem'}}>
                    Already Have An Account? <a href="/signin">Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
