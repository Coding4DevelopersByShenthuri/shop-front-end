import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { user } = useContext(AuthContext);

    const fetchCartItems = async () => {
        try {
            const response = await fetch(`http://localhost:3000/carts/get-cart/${user?.userDetails[0]?._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }

            const data = await response.json();
            console.log(data)
            setCartItems(data[0]?.items || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Inside Cart component

    const handleAddItem = async (productId, quantity) => {
        try {
            const response = await fetch(`http://localhost:3000/carts/add-cart${selectedProduct}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user?.userDetails[0]?._id,
                    productId,
                    quantity,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }

            const updatedCart = await response.json();
            setCartItems(updatedCart.items || []);
        } catch (error) {
            setError(error.message);
        }
    };


    useEffect(() => {
        user?.userDetails[0]?._id && fetchCartItems();
    }, [user?.userDetails[0]?._id]);

    // Function to handle item removal from the cart
    const handleRemoveItem = async () => {
        if (!selectedProduct) return;

        try {
            const response = await fetch(`http://localhost:3000/carts/${selectedProduct}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user?.userDetails[0]?._id }),
            });

            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }

            setCartItems((prevItems) => prevItems.filter(item => item._id !== selectedProduct));
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
            <h2 className="text-3xl font-bold mb-4 mt-14 text-lightblue-900">My Cart</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {cartItems.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead className="bg-lightblue-200">
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
                                        <img src={item.imageURL} alt={item.name} className="w-16 h-16 object-cover" />
                                    </td>
                                    <td className="border px-4 py-2">{item.name}</td>
                                    <td className="border px-4 py-2">{item.count || 1}</td>
                                    <td className="border px-4 py-2">Rs {item.price}</td>
                                    <td className="border px-4 py-2">Rs {item.price * (item.count || 1)}</td>
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
                <p className="text-gray-600">Your cart is currently empty.</p>
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
    );
};

export default Cart;
