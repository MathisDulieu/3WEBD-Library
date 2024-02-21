import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!isValidPassword(password)) {
            alert('The password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, and 1 digit.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        const userData = {
            email: email,
            password: password
        };

        localStorage.setItem('userData', JSON.stringify(userData));

        navigate('/login');
    };


    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
    };

    const getPasswordStrength = (password) => {
        if (password.length < 8) {
            return 'Weak';
        } else if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password)) {
            return 'Strong';
        } else {
            return 'Medium';
        }
    };

    const passwordStrength = getPasswordStrength(password);

    return (
        <div>
            <h1>Create an Account</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} required />
                    <span>Password Strength: {passwordStrength}</span>
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

export default Register;
