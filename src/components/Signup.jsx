import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import googleLogo from "../assets/google-logo.svg"; // Ensure the path is correct

const Signup = () => {
    const { createUser, loginWithGoogle, setUserDetails } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [fullName, setFullName] = useState('');  // State for full name

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleSignUp = (event) => {
        event.preventDefault();

        // Basic validation for email, password, birthday, and full name
        if (email === "" || password === "" || birthday === "" || fullName === "") {
            setError("Email, password, birthday, and full name are required.");
            return;
        }

        createUser(email, password)
            .then((userCredential) => {
                if (typeof userCredential !== 'object' && userCredential.includes('Firebase')) {
                    if (userCredential.includes('Firebase: Error (auth/email-already-in-use)')) {
                        setError('User already exists in the system.');
                    } else {
                        setError(userCredential);
                    }
                    return;
                }
                const user = userCredential.user;
                if (!user) return;
                console.log('User signed up:', user);

                // Call the API to create the user on the server
                const uid = user.uid; // Assuming user object contains uid
                const userData = { email, birthday, name: fullName }; // Adjust as necessary

                fetch(`http://localhost:3000/user/createuser/${uid}`, {
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
                        // Navigate to the desired location
                        navigate(from, { replace: true });
                    })
                    .catch((error) => {
                        console.error('Error calling API:', error);
                        setError(error.message);
                    });
            })
            .catch((error) => {
                console.log(error);
                setError(error.message);
                console.error(`Error: ${error.message}`);
            });
    };

    // Signup using Google account
    const handleRegister = () => {
        loginWithGoogle()
            .then((result) => {
                console.log(result);
                const user = result.user;
                const userData = { email: user.email, birthday: '', name: user.displayName };

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
                        // Navigate to the desired location
                        navigate(from, { replace: true });
                    })
                    .catch((error) => {
                        console.error('Error calling API:', error);
                        setError(error.message);
                    });
            })
            .catch((error) => {
                setError(error.message);
                console.error(`Error: ${error.message}`);
            });
    };

    return (
        <div className="min-h-screen bg-teal-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-5 max-w-md mx-auto mt-12"> 
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10"> {/* Adjusted padding */}
                    <div className="max-w-md mx-auto">
                        <h1 className="text-2xl font-semibold font-serif text-center">Sign-up Form</h1>
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
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 rounded-md"
                                        placeholder="Password"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                        placeholder="Full name"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        id="birthday"
                                        name="birthday"
                                        type="date"
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)}
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 rounded-md"
                                        required
                                    />
                                </div>
                                {error && (
                                    <p className="text-red-500 text-sm">{error}</p>
                                )}
                                <p className="mt-6">If you have an account, please <Link to="/login" className="text-blue-600 underline">Login</Link> here!</p>
                                <div className="relative flex justify-center">
                                    <button type="submit" className="bg-blue-500 text-white rounded-md px-6 py-2 mt-6">Sign up</button>
                                </div>
                            </form>
                        </div>

                        <hr />
                        <div className="flex w-full items-center flex-col mt-5 gap-3">
                            <button onClick={handleRegister} className="block">
                                <img src={googleLogo} alt="Google Logo" className="w-8 h-8 inline-block rounded-md" />Login With Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
