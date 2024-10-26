import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
            console.log(data)
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
    const handleRemoveItem = async (productId) => {
        try {
            const response = await fetch(`http://localhost:3000/wishlists/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${your_token}`
                },
                body: JSON.stringify({ userId:user?.userDetails[0]?._id }),
            });

            if (!response.ok) {
                throw new Error('Failed to remove item from wishlist');
            }

            // Update the local state to remove the item
            setWishlistItems((prevItems) => prevItems.filter(item => item._id !== productId));
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto px-8 py-12">
            <h2 className="text-3xl font-bold mb-4 mt-14">My Wishlist</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {wishlistItems.map((item) => (
                        <div key={item._id} className="p-4 border rounded shadow">
                            <img src={item.imageURL} alt={item.name} className="w-full h-48 object-cover mb-2" />
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-gray-600">${item.price}</p>
                            <div className="mt-2">
                                <Link
                                    to={`/product/${item._id}`}
                                    className="inline-block text-blue-500 hover:underline">
                                    View Details
                                </Link>
                                <button
                                    onClick={() => handleRemoveItem(item._id)}
                                    className="ml-2 text-red-500 hover:underline">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            ) : (
                <p className="text-gray-600">Your wishlist is currently empty.</p>
            )}
        </div>
    );
};

export default Wishlist;
