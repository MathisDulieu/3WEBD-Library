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

    const handleLogin = () => {
        navigate('/login');
    };

    const getPasswordStrengthColor = (passwordStrength) => {
        switch (passwordStrength) {
            case 'Weak':
                return 'bg-red-500';
            case 'Medium':
                return 'bg-orange-400';
            case 'Strong':
                return 'bg-green-300';
        }
    };

    return (
        <>
            <div className="h-screen flex">
                <div className="hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center">
                    <div
                        className="
                  bg-black
                  opacity-20
                  inset-0
                  z-0"
                    ></div>
                    <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
                        <h1 className="text-white font-bold text-4xl font-sans">Library App</h1>
                        <p className="text-white mt-1">Register to get access to our application !</p>
                    </div>
                </div>
                <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
                    <div className="w-full px-8 md:px-32 lg:px-24">
                        <form className="bg-white rounded-md shadow-2xl p-5" onSubmit={handleRegister}>
                            <h1 className="text-gray-800 font-bold text-2xl mb-1">Welcome on our book application !</h1>
                            <p className="text-sm font-normal text-gray-600 mb-8">Hello new user :) !</p>
                            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                <input id="email" className=" pl-2 w-full outline-none border-none" type="email" name="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <input className="pl-2 w-full outline-none border-none" type="password" name="password" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                            </div>

                            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <input className="pl-2 w-full outline-none border-none" type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className="flex justify-between mt-4">
                                <span className="text-sm ml-2">Password strength :</span>
                                <span className="font-bold"> {passwordStrength}</span>
                                <span className={`h-4 w-24 ml-2 rounded-md h-full" ${getPasswordStrengthColor(passwordStrength)}`}></span>
                            </div>
                            <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Register</button>
                            <div className="flex justify-between mt-4">
                                <span className="text-sm ml-2">Already have an account ? <button type="button" className="text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all" onClick={handleLogin}>Login</button></span>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;