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
        console.error("Error creating user:", error);
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
    return signOut(auth)
    .finally(() => setLoading(false));
  };

  // Effect hook to listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const response = await fetch(`http://localhost:3000/user/userdetail/${currentUser.uid}`);
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
      }
      setLoading(false);
    });
  
    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);
  

  // Context value to provide the authentication information
  const authInfo = {
    createUser,
    signIn,
    loginWithGoogle,
    user,
    login,
    logOut,
    loading
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
