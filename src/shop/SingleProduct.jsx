import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const SingleProduct = () => {
    const product = useLoaderData();
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { user } = useContext(AuthContext);

    if (!product) {
        return <div className="text-center mt-28 text-gray-500">Product not found.</div>;
    }

    const { _id: productId, name, imageURL, description, price } = product;

    const incrementCount = () => setCount(prevCount => prevCount + 1);
    const decrementCount = () => setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));

    const addToWishlist = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/wishlists/add-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId , userId:user.userDetails[0]?._id}),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`Added ${count} of ${name} to your wishlist!`);
            } else {
                setMessage('Failed to add product to wishlist.');
            }
        } catch (error) {
            setMessage('An error occurred while adding to wishlist.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#E0F7FA] min-h-screen flex items-center justify-center py-16">
            <div className="bg-white shadow-xl rounded-lg p-8 lg:flex lg:items-center lg:gap-12 lg:max-w-5xl">
                <img src={imageURL} alt={name} className="h-96 w-full lg:w-auto rounded-lg shadow-lg object-cover" />
                
                <div className="text-center lg:text-left mt-8 lg:mt-0 lg:max-w-lg">
                    <h2 className="text-4xl font-bold text-indigo-600 mb-4">{name}</h2>
                    <p className="text-gray-700 text-lg mb-4">{description || "Grab the Product Now!"}</p>
                    <p className="text-3xl font-semibold text-emerald-500 mb-6">Rs {price || "N/A"}</p>

                    <div className="flex items-center gap-4 justify-center lg:justify-start mb-6">
                        <button
                            onClick={decrementCount}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                        >
                            -
                        </button>
                        <span className="text-2xl font-semibold">{count}</span>
                        <button
                            onClick={incrementCount}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                        >
                            +
                        </button>
                    </div>

                    <button
                        onClick={addToWishlist}
                        className="bg-[#03A9F4] hover:bg-[#0288D1] text-white font-bold py-3 px-6 rounded transition duration-200"
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : `Add ${count} to Wishlist`}
                    </button>
                    {message && <p className="text-green-500 mt-4">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
