import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import './Wishlist.css';
import { useAppCountContext } from '../services/countService';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { user } = useContext(AuthContext);
    const { wishlistCount, updateWishlistCount } = useAppCountContext();

    const fetchWishlistItems = async () => {
        try {
            const response = await fetch(`http://localhost:3000/wishlists/get-list/${user?.userDetails[0]?._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch wishlist items');
            }

            const data = await response.json();
            setWishlistItems(data[0].items || []); // Adjust depending on your response structure
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        user?.userDetails[0]?._id && fetchWishlistItems();
    }, [user?.userDetails[0]?._id]);

    // Function to handle item removal from the wishlist
    const handleRemoveItem = async () => {
        if (!selectedProduct) return;

        try {
            const response = await fetch(`http://localhost:3000/wishlists/${selectedProduct}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user?.userDetails[0]?._id }),
            });

            if (!response.ok) {
                throw new Error('Failed to remove item from wishlist');
            }
            updateWishlistCount(user?.userDetails[0]?._id)
            setWishlistItems((prevItems) => prevItems.filter(item => item._id !== selectedProduct));
            setShowModal(false);
            setSelectedProduct(null);
        } catch (error) {
            setError(error.message);
        }
    };

    // Show confirmation modal before deleting
    const confirmRemoveItem = (productId) => {
        setSelectedProduct(productId);
        setShowModal(true);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto px-8 py-12 bg-lightblue-100">
            <div className='mt-28 px-4 lg:px-24'>
                <h2 className="text-3xl font-bold mb-4 mt-14 text-lightblue-900">My Wishlist</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {wishlistItems.length > 0 ? (
                    <div className="overflow-x-auto">
                        {wishlistItems.map((item) => (
                            <a key={item._id} class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                {/* <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/docs/images/blog/image-4.jpg" alt=""> */}
                                <img src={item.imageURL} alt={item.name} className="pl-4 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" />
                                <div class="flex flex-col justify-between p-4 leading-normal">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Grab Now!. Just Have a Look People</p>
                                    <div class="flex items-center justify-between">
                                        <span class="text-3xl font-bold text-gray-900 dark:text-white">Rs {item.price}</span>
                                        <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><Link
                                    to={`/product/${item._id}`}
                                    className="inline-block text-blue-500 hover:underline">
                                    View Details
                                </Link></a>
                                    </div>
                                </div>
                                {/* 
                                <button
                                    onClick={() => confirmRemoveItem(item._id)}
                                    className="ml-10 text-red-500 hover:underline">
                                    Remove
                                </button> */}
                            </a>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">Your wishlist is currently empty.</p>
                )}

                {/* Modal for Confirm Deletion */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm mx-auto">
                            <p className="text-lg font-semibold mb-4">Are you sure you want to remove this item?</p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={handleRemoveItem}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                    Yes, Remove
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
