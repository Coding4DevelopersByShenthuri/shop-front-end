import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWishlistItems = async () => {
            try {
                const response = await fetch('http://localhost:3000/wishlists/add-list', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch wishlist items');
                }

                const data = await response.json();
                setWishlistItems(data.items || []); // Adjust depending on your response structure
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlistItems();
    }, []);

    // Function to handle item removal from the wishlist
    const handleRemoveItem = async (productId) => {
        try {
            const response = await fetch(`http://localhost:3000/wishlists/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${your_token}`
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to remove item from wishlist');
            }

            // Update the local state to remove the item
            setWishlistItems((prevItems) => prevItems.filter(item => item.productId !== productId));
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
                        <div key={item.productId} className="p-4 border rounded shadow">
                            <img src={item.productId.image} alt={item.productId.name} className="w-full h-48 object-cover mb-2" />
                            <h3 className="text-lg font-semibold">{item.productId.name}</h3>
                            <p className="text-gray-600">${item.productId.price}</p>
                            <div className="mt-2">
                                <Link 
                                    to={`/product/${item.productId._id}`} 
                                    className="inline-block text-blue-500 hover:underline">
                                    View Details
                                </Link>
                                <button 
                                    onClick={() => handleRemoveItem(item.productId._id)} 
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
