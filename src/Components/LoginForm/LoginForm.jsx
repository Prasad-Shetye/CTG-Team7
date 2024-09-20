import { FaUser } from "react-icons/fa";
import React, { useState } from 'react';
import './LoginForm.css';
import { FaLock } from "react-icons/fa";
import { Link} from 'react-router-dom';
import {auth, app} from './firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
const SignUpForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log("Login Successfully Created")
        } catch (err){
            console.log(err)
        }
    }
    return (
        <div className='wrapper'>
            <form className = 'signup-form' onSubmit={handleSubmit}>
                <h1>Log In</h1>
                <div className='input-box'>   
                    <input type='text' placeholder='Email Address' required onChange={(e) => setEmail(e.target.value)}/>
                    <FaUser className="icon"/>
                </div>
                <div className='input-box'>   
                    <input type='password' placeholder='Password' required onChange={(e) => setPassword(e.target.value)}/>
                    <FaLock className="icon"/>

                </div>


                <div className="register-link">
                    <p>New Member? <Link to="/signup">Sign Up</Link></p>
                </div>
                <button type="submit">Log In</button> <br />
            </form>

        </div>
    );
};
export default SignUpForm;