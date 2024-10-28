import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import './UserHome.css';
import { FaUser, FaEnvelope, FaBirthdayCake, FaRegEdit, FaBell } from 'react-icons/fa';

const UserHome = () => {
  const { user, loading } = useContext(AuthContext);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    // Fetch newly launched products
    fetch('http://localhost:3000/product/new-products')
      .then((res) => res.json())
      .then((data) => setNewProducts(data))
      .catch((error) => console.error('Failed to fetch new products:', error));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className='mt-20'>
      <div className='container mx-auto px-4 lg:px-24 py-10'>
        <div className='bg-white shadow-md rounded-lg p-8'>
          <h1 className='text-3xl font-bold mb-6'>Welcome to your dashboard</h1>

          {user && (
            <div className='space-y-6'>
              <div className='flex items-center'>
                <img
                  src={user.userDetails[0]?.profilePicture || 'path/to/default-image.png'}
                  alt="Profile"
                  className='w-16 h-16 rounded-full mr-4'
                />
                <div className='text-lg'>
                  <h2 className='font-bold text-xl'>{user.userDetails[0]?.name || 'N/A'}</h2>
                  <div className='flex items-center'>
                    <FaEnvelope className='mr-2' />
                    <span>{user.userDetails[0]?.email || 'N/A'}</span>
                  </div>
                  <div className='flex items-center'>
                    <FaUser className='mr-2' />
                    <span>{user.userDetails[0]?.role || 'N/A'}</span>
                  </div>
                  <div className='flex items-center'>
                    <FaBirthdayCake className='mr-2' />
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

              {/* Newly Launched Products Section */}
              <div className='mt-8 p-4 bg-gray-100 rounded-lg'>
                <h3 className='text-xl font-bold mb-4'>Newly Launched Products</h3>
                {newProducts.length > 0 ? (
                  <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {newProducts.map((product) => (
                      <div key={product._id} className='bg-white p-4 shadow rounded'>
                        <img
                          src={product.imageURL}
                          alt={product.name}
                          className='h-40 w-full object-cover rounded mb-2'
                        />
                        <h4 className='font-bold text-lg'>{product.name}</h4>
                        <p className='text-sm text-gray-600'>{product.description}</p>
                        <p className='text-lg font-semibold mt-2'>Rs {product.price}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No new products available at this time.</p>
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
