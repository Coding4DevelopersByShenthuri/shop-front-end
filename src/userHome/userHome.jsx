import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import './UserHome.css';
import { FaUser, FaEnvelope, FaBirthdayCake, FaRegEdit, FaBell } from 'react-icons/fa'; // Import icons

const UserHome = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div> {/* Add a loader for better loading indication */}
      </div>
    );
  }

  return (
    <div className='bg-teal-100 mt-[80px]'>
      <div className='container mx-auto px-4 lg:px-24 py-10'>
        <div className='bg-white shadow-md rounded-lg p-8'>
          <h1 className='text-3xl font-bold mb-6'>Welcome to your dashboard</h1>
          
          {user && (
            <div className='space-y-6'>
              <div className='flex items-center'>
                <img
                  src={user.userDetails[0]?.profilePicture || 'path/to/default-image.png'} // Fallback image
                  alt="Profile"
                  className='w-16 h-16 rounded-full mr-4' // Styling the profile picture
                />
                <div className='text-lg'>
                  <h2 className='font-bold text-xl'>{user.userDetails[0]?.name || 'N/A'}</h2>
                  <div className='flex items-center'>
                    <FaEnvelope className='mr-2' /> {/* Email icon */}
                    <span>{user.userDetails[0]?.email || 'N/A'}</span>
                  </div>
                  <div className='flex items-center'>
                    <FaUser className='mr-2' /> {/* Role icon */}
                    <span>{user.userDetails[0]?.role || 'N/A'}</span>
                  </div>
                  <div className='flex items-center'>
                    <FaBirthdayCake className='mr-2' /> {/* Birthday icon */}
                    <span>{new Date(user.userDetails[0]?.birthday).toLocaleDateString() || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='mt-4'>
                <button className='mr-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
                  <FaRegEdit className='inline mr-1' /> Edit Profile
                </button>
                <button className='p-2 bg-gray-500 text-white rounded hover:bg-gray-600'>
                  <FaBell className='inline mr-1' /> View Notifications
                </button>
              </div>

              {/* Notification Section */}
              <div className='mt-8 p-4 bg-gray-100 rounded-lg'>
                <h3 className='text-xl font-bold mb-4'>Notifications</h3>
                {/* Assuming notifications are an array in the user object */}
                {user.notifications?.length > 0 ? (
                  <ul>
                    {user.notifications.map((notification, index) => (
                      <li key={index} className='mb-2'>
                        {notification.message}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No notifications at this time.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
