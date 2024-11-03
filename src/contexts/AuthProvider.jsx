import React, { createContext, useState, useEffect } from 'react';
import app from '../firebase/firebase.config';
import { 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  onAuthStateChanged, 
  signOut
} from 'firebase/auth';

// Create Authentication Context
export const AuthContext = createContext();

// Initialize Firebase Authentication
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  // State for storing user and loading status
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to sign up a new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .catch(error => {
        return error.message
      })
      .finally(() => setLoading(false));
  };

  // Function to sign in an existing user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  // Function to log in with Google
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .finally(() => setLoading(false));
  };

  // Function to log in with email and password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  const logOut = () => {
    setLoading(true);

    window.location.reload();
    return signOut(auth)
    .finally(() => {
      window.location.href = '/';
      setLoading(false)});
  };

  const setUserDetails = () => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true); // Ensure loading starts when auth state changes
      if (currentUser) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/userdetail/${currentUser.uid}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const userData = await response.json();
          // Merge user data with current user
          const mergedData = { ...currentUser, ...userData };
          setUser(mergedData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // Handle case when currentUser is null (user not logged in)
        setUser(null);
      }
      setLoading(false); // Ensure loading ends after fetching or if no user
    });
  };
  

  // Effect hook to listen to authentication state changes
  useEffect(() => {
    setUserDetails()
  }, []);
  

  // Context value to provide the authentication information
  const authInfo = {
    createUser,
    signIn,
    loginWithGoogle,
    user,
    login,
    logOut,
    setUserDetails,
    loading
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
