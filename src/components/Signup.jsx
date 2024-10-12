import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import googleLogo from "../assets/google-logo.svg"; // Ensure the path is correct

const Signup = () => {
    const { createUser, loginwithGoogle } = useContext(AuthContext);
    const [error, setError] = useState(""); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleSignUp = (event) => {
        event.preventDefault();
        
        // Basic validation for email and password
        if (email === "" || password === "") {
            setError("Email and password are required.");
            return;
        }
        
        createUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User signed up:', user);
                alert("Sign up Successfully!");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                setError(error.message);
                console.error(`Error: ${error.message}`);
            });
    };

    // Signup using Google account
    const handleRegister = () => {
        loginwithGoogle()
            .then((result) => {
                const user = result.user;
                alert("Sign up Successfully!");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                setError(error.message);
                console.error(`Error: ${error.message}`);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-md sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-2xl font-semibold">Sign-up Form</h1>
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleSignUp} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                        placeholder="Password"
                                    />
                                </div>
                                {error && ( 
                                    <p className="text-red-500 text-sm">{error}</p>
                                )}
                                <p>If you have an account, please <Link to="/login" className="text-blue-600 underline">Login</Link> here!</p>
                                <div className="relative">
                                    <button type="submit" className="bg-blue-500 text-white rounded-md px-6 py-2">Sign up</button>
                                </div>
                            </form>
                        </div>

                        <hr />
                        <div className="flex w-full items-center flex-col mt-5 gap-3">
                            <button onClick={handleRegister} className="block">
                                <img src={googleLogo} alt="Google Logo" className="w-8 h-8 inline-block" />Login With Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
