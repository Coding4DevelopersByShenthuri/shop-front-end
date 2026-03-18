import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import googleLogo from "../assets/google-logo.svg";
import { Button, Card, Label, TextInput, Badge } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const { login, loginWithGoogle, setUserDetails } = useContext(AuthContext);
    const [error, setError] = useState(""); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

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
                    setError(error.message); // Updated to show the actual error message
                }
                return;
            });
    };

    // Signup using Google account
    const handleRegister = () => {
        loginWithGoogle()
            .then((result) => {
                const user = result.user;
                const userData = { email: user.email, birthday: '', name: user.displayName };
                fetch(`${import.meta.env.VITE_API_BASE_URL}/user/createuser/${user.uid}`, {
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
                    setUserDetails();
                    navigate(from, { replace: true });
                })
                .catch((error) => {
                    setError(error.message);
                });
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
            <div className="max-w-md w-full">
                <Card className="rounded-[3rem] shadow-2xl shadow-slate-200/60 border-none p-4">
                    <div className="text-center space-y-4 mb-8">
                        <Badge color="indigo" size="lg" className="w-fit mx-auto px-4 py-1 uppercase tracking-widest font-bold">Welcome Back</Badge>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Login to <span className="text-indigo-600">Account</span></h1>
                        <p className="text-slate-500 font-medium">Please enter your credentials to continue.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</Label>
                            <TextInput
                                id="email"
                                type="email"
                                icon={() => <FontAwesomeIcon icon={faEnvelope} className="text-slate-400" />}
                                placeholder="name@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="premium-input"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Password</Label>
                            <TextInput
                                id="password"
                                type="password"
                                icon={() => <FontAwesomeIcon icon={faLock} className="text-slate-400" />}
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="premium-input"
                            />
                        </div>

                        {error && (
                            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                                <p className="text-rose-600 text-sm font-bold text-center">{error}</p>
                            </div>
                        )}

                        <Button 
                            type="submit" 
                            size="xl" 
                            className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-black py-4 shadow-lg shadow-indigo-100 transition-all active:scale-95"
                            disabled={loading}
                        >
                            {loading ? 'Authenticating...' : (
                                <span className="flex items-center gap-2">
                                    Sign In Securely <FontAwesomeIcon icon={faSignInAlt} />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center space-y-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-black tracking-widest">Or Continue With</span></div>
                        </div>

                        <button 
                            onClick={handleRegister}
                            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 p-4 rounded-2xl transition-all font-bold text-slate-600 group"
                        >
                            <img src={googleLogo} alt="Google" className="w-6 h-6" />
                            <span>Continue with Google</span>
                        </button>

                        <p className="text-sm font-medium text-slate-500">
                            Don't have an account? <Link to="/sign-up" className="text-indigo-600 font-black hover:underline">Create one now</Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;
