import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

const UserHome = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-teal-100 mt-[80px]'>
      <div className='container mx-auto px-4 lg:px-24 py-10'>
        <div className='bg-white shadow-md rounded-lg p-8'>
          <h1 className='text-3xl font-bold mb-6'>Welcome to your dashboard</h1>
          
          {user && (
            <div className='space-y-4'>
              <div className='text-lg'>
                <span className='font-bold'>Name:</span> {user.userDetails[0]?.name || 'N/A'}
              </div>
              <div className='text-lg'>
                <span className='font-bold'>Email:</span> {user.userDetails[0]?.email || 'N/A'}
              </div>
              <div className='text-lg'>
                <span className='font-bold'>Role:</span> {user.userDetails[0]?.role || 'N/A'}
              </div>
              <div className='text-lg'>
                <span className='font-bold'>Birthday:</span> {new Date(user.userDetails[0]?.birthday).toLocaleDateString() || 'N/A'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
