import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import { Button, Badge } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLeaf, faTruckMoving, faArrowLeft, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import productPlaceholder from '../assets/product-placeholder.png';
import { AuthContext } from '../contexts/AuthProvider';
import { useAppCountContext } from '../services/countService';
import { HiOutlineShoppingBag, HiOutlineHeart } from 'react-icons/hi';

const SingleProduct = () => {
    const product = useLoaderData();
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalConfig, setModalConfig] = useState({ title: '', message: '', type: 'success' });
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { updateWishlistCount, updateCartCount } = useAppCountContext();

    if (!product) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-50 text-center">
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Product Not Found</h2>
                    <p className="text-slate-500 mb-8">The item you're looking for might have been moved or is out of stock.</p>
                    <Link to="/shop">
                        <Button color="indigo" pill size="xl" className="px-8 font-black mx-auto">Back to Collection</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const { _id: productId, name, imageURL, description, price, category, unit } = product;

    const handleQuantityChange = (val) => {
        setCount(Math.max(1, parseInt(val) || 1));
    };

    const handleWishlist = async () => {
        if (!user) return navigate('/login');
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/wishlists/add-list`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, userId: user.userDetails[0]?._id }),
            });
            if (response.ok) {
                updateWishlistCount(user.userDetails[0]?._id);
                setModalConfig({ title: 'Added to Wishlist', message: `"${name}" has been saved to your favorites.`, type: 'wishlist' });
                setModalShow(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!user) return navigate('/login');
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/carts/add-cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, userId: user.userDetails[0]?._id, quantity: count }),
            });
            if (response.ok) {
                updateCartCount(user.userDetails[0]?._id);
                setModalConfig({ title: 'Added to Cart', message: `${count} x "${name}" added to your shopping bag.`, type: 'cart' });
                setModalShow(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/shop" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors group">
                    <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Collection
                </Link>

                <div className="bg-white rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Image Side */}
                        <div className="p-8 lg:p-16 flex items-center justify-center bg-slate-50/50">
                            <div className="relative group w-full aspect-square max-w-md">
                                <img 
                                    src={imageURL} 
                                    alt={name} 
                                    className="w-full h-full object-cover rounded-[3rem] shadow-2xl transform transition-transform duration-700 group-hover:scale-105" 
                                    onError={(e) => {
                                        e.target.src = productPlaceholder;
                                    }}
                                />
                                <div className="absolute top-6 left-6">
                                    <Badge color="indigo" size="lg" className="px-4 py-1.5 font-black rounded-2xl shadow-lg border-2 border-white/50 backdrop-blur-sm">
                                        {category || 'Premium'}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="p-8 lg:p-16 space-y-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-amber-500">
                                    {[...Array(5)].map((_, i) => <FontAwesomeIcon key={i} icon={faStar} className="text-sm" />)}
                                    <span className="text-slate-400 text-xs font-black uppercase tracking-widest ml-2">4.9 (120+ Reviews)</span>
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-tight">{name}</h1>
                                <p className="text-3xl font-black text-indigo-600">Rs {price} <span className="text-lg text-slate-400 font-bold ml-1">/ {unit || 'each'}</span></p>
                            </div>

                            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
                                <p>{description || "Experience the pinnacle of quality with our curated selection. Every product is sourced responsibly to ensure the highest standards for our discerning customers."}</p>
                                
                                <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                                            <FontAwesomeIcon icon={faLeaf} />
                                        </div>
                                        <span className="text-sm font-bold text-slate-600">Organic & Fresh</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                                            <FontAwesomeIcon icon={faTruckMoving} />
                                        </div>
                                        <span className="text-sm font-bold text-slate-600">Fast Delivery</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100">
                                        <button onClick={() => handleQuantityChange(count - 1)} className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-indigo-600 font-black text-xl">-</button>
                                        <input 
                                            type="text" 
                                            value={count} 
                                            readOnly 
                                            className="w-12 border-none bg-transparent text-center font-black text-slate-900" 
                                        />
                                        <button onClick={() => handleQuantityChange(count + 1)} className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-indigo-600 font-black text-xl">+</button>
                                    </div>
                                    <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Select Quantity</span>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button 
                                        onClick={handleAddToCart}
                                        size="xl" 
                                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-black py-4 shadow-xl shadow-indigo-100 transition-all active:scale-95"
                                        disabled={loading}
                                    >
                                        <span className="flex items-center gap-3 italic">
                                            Add to Shopping Bag <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Button>
                                    <button 
                                        onClick={handleWishlist}
                                        className="p-5 rounded-2xl bg-white border-2 border-slate-100 text-slate-400 hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50 transition-all active:scale-95 shadow-lg"
                                        title="Add to Wishlist"
                                    >
                                        <FontAwesomeIcon icon={faHeart} className="text-2xl" />
                                    </button>
                                </div>

                                <div className="flex items-center justify-center gap-8 pt-4">
                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                        <FontAwesomeIcon icon={faShieldAlt} className="text-indigo-400" />
                                        Secure Checkout
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                        <HiOutlineShoppingBag className="text-indigo-400 w-4 h-4" />
                                        100% Satisfaction
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <Modal show={modalShow} onClose={() => setModalShow(false)} size="md" popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center p-6">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${modalConfig.type === 'cart' ? 'bg-indigo-50 text-indigo-500' : 'bg-rose-50 text-rose-500'}`}>
                            {modalConfig.type === 'cart' ? <HiOutlineShoppingBag className="w-10 h-10" /> : <HiOutlineHeart className="w-10 h-10" />}
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">{modalConfig.title}</h3>
                        <p className="text-slate-500 font-medium mb-10">{modalConfig.message}</p>
                        <div className="grid grid-cols-2 gap-4">
                            <Button color="indigo" onClick={() => setModalShow(false)} className="rounded-2xl font-bold">
                                Continue
                            </Button>
                            <Button color="gray" onClick={() => navigate(modalConfig.type === 'cart' ? '/carts' : '/wishlists')} className="rounded-2xl font-bold">
                                View {modalConfig.type === 'cart' ? 'Bag' : 'Wishlist'}
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SingleProduct;
