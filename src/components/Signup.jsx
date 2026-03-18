import { Button, Card, Label, TextInput, Badge } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faCalendar, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
    const { createUser, loginWithGoogle, setUserDetails } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [fullName, setFullName] = useState('');  
    const [loading, setLoading] = useState(false);

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

                // Call the API to create the user on the server
                const uid = user.uid; // Assuming user object contains uid
                const userData = { email, birthday, name: fullName }; // Adjust as necessary

                fetch(`${import.meta.env.VITE_API_BASE_URL}/user/createuser/${uid}`, {
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
                        // Navigate to the desired location
                        navigate(from, { replace: true });
                    })
                    .catch((error) => {
                        setError(error.message);
                    });
            })
            .catch((error) => {
                setError(error.message);
                console.error(`Error: ${error.message}`);
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
                        // Navigate to the desired location
                        navigate(from, { replace: true });
                    })
                    .catch((error) => {
                        setError(error.message);
                    });
            })
            .catch((error) => {
                setError(error.message);
                console.error(`Error: ${error.message}`);
            });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
            <div className="max-w-md w-full">
                <Card className="rounded-[3rem] shadow-2xl shadow-slate-200/60 border-none p-4">
                    <div className="text-center space-y-4 mb-8">
                        <Badge color="indigo" size="lg" className="w-fit mx-auto px-4 py-1 uppercase tracking-widest font-bold">Join Community</Badge>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Create Your <span className="text-indigo-600">Account</span></h1>
                        <p className="text-slate-500 font-medium">Get started with a premium shopping experience.</p>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</Label>
                                <TextInput
                                    id="fullName"
                                    type="text"
                                    icon={() => <FontAwesomeIcon icon={faUser} className="text-slate-400" />}
                                    placeholder="Jane Doe"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="premium-input"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</Label>
                                <TextInput
                                    id="email"
                                    type="email"
                                    icon={() => <FontAwesomeIcon icon={faEnvelope} className="text-slate-400" />}
                                    placeholder="jane@example.com"
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

                            <div className="space-y-2">
                                <Label htmlFor="birthday" className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Birthday</Label>
                                <TextInput
                                    id="birthday"
                                    type="date"
                                    icon={() => <FontAwesomeIcon icon={faCalendar} className="text-slate-400" />}
                                    required
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                    className="premium-input"
                                />
                            </div>
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
                            {loading ? 'Creating Account...' : (
                                <span className="flex items-center gap-2">
                                    Join Now <FontAwesomeIcon icon={faUserPlus} />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center space-y-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-black tracking-widest">Speed Registration</span></div>
                        </div>

                        <button 
                            onClick={handleRegister}
                            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 p-4 rounded-2xl transition-all font-bold text-slate-600 group"
                        >
                            <img src={googleLogo} alt="Google" className="w-6 h-6" />
                            <span>Sign up with Google</span>
                        </button>

                        <p className="text-sm font-medium text-slate-500">
                            Already a member? <Link to="/login" className="text-indigo-600 font-black hover:underline">Sign in here</Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Signup;
