import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap'; // Add this import

const AdminRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) { // Fixing the loading condition
        return (
            <div className="text-center">
                <Spinner animation="border" role="status" />
            </div>
        );
    }

    if (user?.userDetails[0]?.role === 'admin') {
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace />;
};

export default AdminRoute;
