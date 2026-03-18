import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import './Wishlist.css';
import { useAppCountContext } from '../services/countService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faArrowLeft, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

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
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/wishlists/get-list/${user?.userDetails[0]?._id}`, {
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
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/wishlists/product/${selectedProduct}`, {
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
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-20 lg:py-32">
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">My Wishlist</h2>
                    <Link to="/shop" className="text-indigo-600 font-bold hover:underline flex items-center gap-2">
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Continue Shopping
                    </Link>
                </div>
    
                {error && (
                    <div className="bg-rose-50 border-l-4 border-rose-500 p-4 mb-8 rounded-r-lg shadow-sm">
                        <p className="text-rose-700 font-bold">{error}</p>
                    </div>
                )}
    
                {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {wishlistItems.map((item) => (
                            <div key={item._id} className="group bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2">
                                <div className="relative h-64 overflow-hidden">
                                    <img src={item.imageURL} alt={item.name} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute top-4 right-4 bg-rose-500 text-white p-2.5 rounded-xl shadow-lg transform translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <FontAwesomeIcon icon={faHeart} />
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <p className='text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1'>{item.category || 'Product'}</p>
                                        <h5 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{item.name}</h5>
                                    </div>
                                    <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2 italic">"A perfect addition to your collection. Limited stock available!"</p>
                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-2xl font-black text-slate-900">Rs {item.price}</span>
                                        <div className="flex items-center gap-3">
                                            <Link
                                                to={`/product/${item._id}`}
                                                className="bg-indigo-50 text-indigo-600 p-3 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300">
                                                <FontAwesomeIcon icon={faEye} />
                                            </Link>
                                            <button
                                                onClick={() => confirmRemoveItem(item._id)}
                                                className="bg-rose-50 text-rose-500 p-3 rounded-xl hover:bg-rose-500 hover:text-white transition-all duration-300"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-20 rounded-[3rem] shadow-xl shadow-slate-100 border border-slate-50 text-center">
                        <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <FontAwesomeIcon icon={faHeart} className="text-rose-200 text-4xl" />
                        </div>
                        <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Your wishlist is empty</h3>
                        <p className="text-slate-500 text-lg mb-10 max-w-sm mx-auto">Save items you love and they'll show up here for you to shop later.</p>
                        <Link to="/shop">
                            <Button size="xl" pill className="bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 shadow-lg px-8 py-2 mx-auto">
                                Explore Products
                            </Button>
                        </Link>
                    </div>
                )}
    
                {/* Modal for Confirm Deletion */}
                <Modal show={showModal} onClose={() => setShowModal(false)} size="md" popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-rose-500" />
                            <h3 className="mb-5 text-lg font-bold text-slate-900">
                                Are you sure you want to remove this from your wishlist?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={handleRemoveItem} className="font-bold">
                                    Yes, Remove
                                </Button>
                                <Button color="gray" onClick={() => setShowModal(false)} className="font-bold">
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default Wishlist;
