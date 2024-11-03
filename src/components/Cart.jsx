import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { useAppCountContext } from '../services/countService';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showClearModal, setShowClearModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { user } = useContext(AuthContext);
    const { updateWishlistCount,updateCartCount } = useAppCountContext();

    const fetchCartItems = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/carts/get-cart/${user?.userDetails[0]?._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            const data = await response.json();
            setCartItems(data || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        user?.userDetails[0]?._id && fetchCartItems();
    }, [user?.userDetails[0]?._id]);

    // Function to handle item removal from the cart
    const handleRemoveItem = async () => {
        if (!selectedProduct) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/carts/product/${selectedProduct}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user?.userDetails[0]?._id }),
            });

            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }
            updateCartCount(user.userDetails[0]?._id);
            // Refetch cart items after deletion
            await fetchCartItems();

            setShowRemoveModal(false);
            setSelectedProduct(null);
        } catch (error) {
            setError(error.message);
        }
    };

    // Show confirmation modal before deleting
    const confirmRemoveItem = (productId) => {
        setSelectedProduct(productId);
        setShowRemoveModal(true);
    };

    // Function to handle clearing the cart
    const handleClearCart = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/carts/clear-cart`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user?.userDetails[0]?._id }),
            });

            if (!response.ok) {
                throw new Error('Failed to clear cart');
            }
            updateCartCount(user.userDetails[0]?._id);
            // Refetch cart items after clearing
            await fetchCartItems();
            setShowClearModal(false);
        } catch (error) {
            setError(error.message);
        }
    };

    // Show confirmation modal before clearing the cart
    const confirmClearCart = () => {
        setShowClearModal(true);
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.productId.price * (item.quantity || 1), 0);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="page-container">
            <div className='w-full max-w-[1200px] mx-auto px-4 lg:px-24'>
            <h2 className="text-4xl font-bold mb-6 mt-32 text-black font-serif">My Cart</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {cartItems.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-400">
                        <thead className="bg-teal-500">
                            <tr>
                                <th className="border px-4 py-2">Image</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Count</th>
                                <th className="border px-4 py-2">Price per Unit</th>
                                <th className="border px-4 py-2">Total Price</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item._id}>
                                    <td className="border px-4 py-2">
                                        <img src={item.productId.imageURL} alt={item.productId.name} className="w-16 h-16 object-cover" />
                                    </td>
                                    <td className="border px-4 py-2">{item.productId.name}</td>
                                    <td className="border px-4 py-2">{item.quantity || 1}</td>
                                    <td className="border px-4 py-2">Rs {item.productId.price}</td>
                                    <td className="border px-4 py-2">Rs {item.productId.price * (item.quantity || 1)}</td>
                                    <td className="border px-4 py-2">
                                        <Link
                                            to={`/product/${item.productId._id}`}
                                            className="inline-block text-blue-500 hover:underline">
                                            View Details
                                        </Link>
                                        <button
                                            onClick={() => confirmRemoveItem(item._id)}
                                            className="ml-2 text-red-500 hover:underline flex items-center"
                                            style={{ marginLeft: 'auto', marginTop: '-20px' }}> {/* Adjust the negative margin to move it further up */}
                                            <FontAwesomeIcon icon={faTrash} className="mr-0.25" /> {/* Reduce right margin if needed */}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Display Total Price */}
                    <div className="mt-6 text-right">
                        <p className="text-xl font-bold">Total: Rs {calculateTotalPrice()}</p>
                    </div>
                    <button
                        onClick={confirmClearCart}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Clear Cart
                    </button>
                </div>
            ) : (
                <p className="text-gray-600">Your cart is currently empty.</p>
            )}

            {/* Modal for Confirm Item Removal */}
            {showRemoveModal && (
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
                                onClick={() => setShowRemoveModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Confirm Clear Cart */}
            {showClearModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm mx-auto">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to clear your cart?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleClearCart}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                Yes, Clear Cart
                            </button>
                            <button
                                onClick={() => setShowClearModal(false)}
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

export default Cart;
