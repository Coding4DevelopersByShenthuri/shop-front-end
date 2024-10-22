import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import googleLogo from "../assets/google-logo.svg";

const Login = () => {
    const { login, loginWithGoogle, setUserDetails } = useContext(AuthContext);
    const [error, setError] = useState(""); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (event) => {
        event.preventDefault();

        // Basic validation for email and password
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        login(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate(from, { replace: true });
            })
            .catch((error) => {
                if (error.message.includes('Firebase: Error (auth/invalid-credential).')) {
                    setError('Invalid credential');
                } else {
                    setError(userCredential);
                }
                return;
            });
    };

    // Signup using Google account
    const handleRegister = () => {
        loginWithGoogle()
            .then((result) => {
                const user = result.user;
                const userData = { email: user.email, birthday: '' };
                fetch(`http://localhost:3000/user/createuser/${user.uid}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to create user on server');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('User created on server:', data);
                    setUserDetails();
                    navigate(from, { replace: true });
                })
                .catch((error) => {
                    console.error('Error calling API:', error);
                    setError(error.message);
                });
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-md sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-2xl font-semibold">Login Form</h1>
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleLogin} className="py-8 mt-6 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative mt-12"> {/* Increased gap here */}
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
                                    <p className="text-red-600 text-base">{error}</p>
                                )}
                                <p>If you don't have an account, please <Link to="/sign-up" className="text-blue-600 underline">Sign up</Link> here!</p>
                                <div className="relative">
                                    <button type="submit" className="bg-blue-500 text-white rounded-md px-6 py-2">Login</button>
                                </div>
                            </form>
                        </div>

                        <hr />
                        <div className="flex w-full items-center flex-col mt-5 gap-3">
                            <button onClick={handleRegister} className="flex items-center gap-2">
                                <img src={googleLogo} alt="Google Logo" className="w-8 h-8" />
                                <span>Login With Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
