import { FaUser, FaLock } from "react-icons/fa";
import React, { useState } from 'react';
import './LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [slide, setSlide] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login Successfully Created");
        } catch (err) {
            console.log(err);
        }
    };

    // Function to handle the Log In link click with a side swipe transition
    const handleLogInClick = (e) => {
        e.preventDefault(); // Prevent immediate navigation
        setSlide(true); // Trigger the slide-out animation
        setTimeout(() => {
            navigate('/login'); // Navigate to login after the animation completes
        }, 500); // Match the CSS transition duration
    };

    return (
        <div className={`wrapper ${slide ? 'slide-out' : ''}`}>
            <form className='signup-form' onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <div className='input-box'>
                    <input
                        type='text'
                        placeholder='Email Address'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FaUser className="icon" />
                </div>
                <div className='input-box'>
                    <input
                        type='password'
                        placeholder='Password'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className="icon" />
                </div>

                <div className="register-link">
                    <p>
                        Existing Member?{' '}
                        <Link to="/login" onClick={handleLogInClick}>
                            Log In
                        </Link>
                    </p>
                </div>
                <button type="submit">Sign Up</button> <br />
            </form>
        </div>
    );
};

export default SignUpForm;
