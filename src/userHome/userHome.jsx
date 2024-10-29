import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import './UserHome.css';
import { FaUser, FaEnvelope, FaBirthdayCake, FaRegEdit, FaBell } from 'react-icons/fa';

const UserHome = () => {
  const { user, loading } = useContext(AuthContext);

  // Static array of newly launched products
  const newProducts = [
    {
      _id: '1',
      name: 'Organic Green Tea',
      description: 'A refreshing blend of high-quality green tea leaves, rich in antioxidants and perfect for a soothing cup.',
      price: 150,
      imageURL: 'https://www.assamicaagro.in/cdn/shop/articles/Untitled_design_26_1200x1200.png?v=1592799889',
    },
    {
      _id: '2',
      name: 'Vegan Protein Powder',
      description: 'A plant-based protein powder made from peas and brown rice, perfect for smoothies and post-workout shakes.',
      price: 2200,
      imageURL: 'https://media.post.rvohealth.io/wp-content/uploads/sites/3/2024/03/3040632-The-12-Best-Vegan-Protein-Powders-1296x728-Header-e9f1ca-1024x575.jpg',
    },
    {
      _id: '3',
      name: 'Eco-Friendly Yoga Mat',
      description: 'Made from biodegradable materials, this yoga mat provides excellent grip and cushioning for all your workout needs.',
      price: 1200,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToXQlIvinNwNYX4TWDnZI3qDJq1Jhr7BWztA&s',
    },
    {
      _id: '4',
      name: 'Chia Seeds',
      description: 'A selection of herbal teas to promote relaxation and digestion, including chamomile, peppermint, and ginger.',
      price: 400,
      imageURL: 'https://ordinaryvegan.net/wp-content/uploads/2014/12/Chia-seed-pudding-small-.jpg',
    },
  ];

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
        <div className='user-dashboard'>
          <h1 className='text-3xl font-bold mb-6'>Welcome to your dashboard</h1>

          {user && (
            <div className='space-y-6'>
              <div className='profile-header'>
                <img
                  src={user.userDetails[0]?.profilePicture || 'path/to/default-image.png'}
                  alt="Profile"
                  className='profile-picture'
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
              <div className='action-buttons mt-4'>
                <button className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
                  <FaRegEdit className='inline mr-1' /> Edit Profile
                </button>
                <button className='p-2 bg-gray-500 text-white rounded hover:bg-gray-600'>
                  <FaBell className='inline mr-1' /> View Notifications
                </button>
              </div>

              {/* Notification Section */}
              <div className='notification-section'>
                <h3 className='font-bold mb-4'>Notifications</h3>
                {user.notifications?.length > 0 ? (
                  <ul>
                    {user.notifications.map((notification, index) => (
                      <li key={index} className='mb-2'>
                        {notification.message}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='font-serif'>Happy Yoga Week, Grow Healthier!</p>
                )}
              </div>

              {/* Newly Launched Products Section */}
              <div className='new-products-section'>
                <h3 className='font-bold mb-4'>Newly Launched Products</h3>
                <h2>Products Especially for this Yoga Week!</h2>
                {newProducts.length > 0 ? (
                  <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {newProducts.map((product) => (
                      <div key={product._id} className='product-card shadow-lg p-4 rounded-md'>
                        <img
                          src={product.imageURL}
                          alt={product.name}
                          className='product-image w-full h-48 object-cover rounded-md'
                        />
                        <h4 className='font-bold text-lg mt-2'>{product.name}</h4>
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
