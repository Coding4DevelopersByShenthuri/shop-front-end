import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import './Wishlist.css';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { user } = useContext(AuthContext);

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
        <div className="container">
            <div className='mt-28 px-4 lg:px-24'>
                <h2 className="text-3xl font-bold mb-4 mt-14 text-lightblue-900">My Wishlist</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {wishlistItems.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300">
                            <thead className="bg-lightblue-200">
                                <tr>
                                    <th className="border px-4 py-2">Image</th>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Price per Unit</th>
                                    <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlistItems.map((item) => (
                                    <tr key={item._id}>
                                        <td className="border px-4 py-2">
                                            <img src={item.imageURL} alt={item.name} className="w-16 h-16 object-cover" />
                                        </td>
                                        <td className="border px-4 py-2">{item.name}</td>
                                        <td className="border px-4 py-2">Rs {item.price}</td>
                                        <td className="border px-4 py-2">
                                            <Link
                                                to={`/product/${item._id}`}
                                                className="inline-block text-blue-500 hover:underline">
                                                View Details
                                            </Link>
                                            <button
                                                onClick={() => confirmRemoveItem(item._id)}
                                                className="ml-2 text-red-500 hover:underline">
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
