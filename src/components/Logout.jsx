import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logOut } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";
    
    const handleLogout = () => {
        logOut().then(() => {
            // Sign-out successful.
            alert('Sign-out successful!');
            navigate(from, { replace: true });
        }).catch((error) => {
            // Handle error
            console.error('Error during logout:', error);
        });
    };

    return (
        <div className='h-screen bg-teal-300 flex items-center justify-center'>
            <button 
                className='bg-red-600 px-4 py-2 text-yellow-50 rounded' 
                onClick={handleLogout}  // Moved onClick out of the className
            >
                Logout
            </button>
        </div>
    );
};

export default Logout;
