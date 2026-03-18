import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useAppCountContext } from '../services/countService';
import { Table, Modal, Button, Badge } from 'flowbite-react';
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showClearModal, setShowClearModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { user } = useContext(AuthContext);
    const { updateWishlistCount, updateCartCount } = useAppCountContext();

    const fetchCartItems = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/carts/get-cart/${user?.userDetails[0]?._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            const data = await response.json();
            setCartItems(data.data || []);
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
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">My Shopping Cart</h2>
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

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                                <div className="hidden md:block">
                                    <Table hoverable className="min-w-full">
                                        <Table.Head className="bg-slate-50 border-b border-slate-100">
                                            <Table.HeadCell className="py-5 px-6">Product</Table.HeadCell>
                                            <Table.HeadCell className="py-5 text-center">Qty</Table.HeadCell>
                                            <Table.HeadCell className="py-5">Price</Table.HeadCell>
                                            <Table.HeadCell className="py-5">Total</Table.HeadCell>
                                            <Table.HeadCell className="py-5 text-center">Remove</Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body className="divide-y divide-slate-100">
                                            {cartItems.map((item) => (
                                                <Table.Row key={item._id} className="bg-white hover:bg-slate-50/50 transition-colors">
                                                    <Table.Cell className="py-6 px-6">
                                                        <div className="flex items-center gap-6">
                                                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0">
                                                                <img 
                                                                    src={item.productId.imageURL} 
                                                                    alt={item.productId.name} 
                                                                    className="w-full h-full object-cover" 
                                                                    onError={(e) => {
                                                                        e.target.src = productPlaceholder;
                                                                    }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <Link to={`/product/${item.productId._id}`} className="text-lg font-extrabold text-slate-900 hover:text-indigo-600 transition-colors">
                                                                    {item.productId.name}
                                                                </Link>
                                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{item.productId.category}</p>
                                                            </div>
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell className="text-center font-bold text-slate-700">
                                                        {item.quantity || 1}
                                                    </Table.Cell>
                                                    <Table.Cell className="font-semibold text-slate-600">
                                                        Rs {item.productId.price}
                                                    </Table.Cell>
                                                    <Table.Cell className="font-black text-slate-900 text-lg">
                                                        Rs {item.productId.price * (item.quantity || 1)}
                                                    </Table.Cell>
                                                    <Table.Cell className="text-center">
                                                        <button
                                                            onClick={() => confirmRemoveItem(item._id)}
                                                            className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-3 rounded-2xl transition-all active:scale-90"
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                    </Table>
                                </div>

                                {/* Mobile List Layout */}
                                <div className="md:hidden divide-y divide-slate-100">
                                    {cartItems.map((item) => (
                                        <div key={item._id} className="p-6 flex gap-4">
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                                                <img 
                                                    src={item.productId.imageURL} 
                                                    alt={item.productId.name} 
                                                    className="w-full h-full object-cover" 
                                                    onError={(e) => {
                                                        e.target.src = productPlaceholder;
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <Link to={`/product/${item.productId._id}`} className="text-lg font-extrabold text-slate-900">
                                                    {item.productId.name}
                                                </Link>
                                                <div className="flex justify-between items-center">
                                                    <p className="font-bold text-slate-500">{item.quantity || 1} x Rs {item.productId.price}</p>
                                                    <p className="font-black text-indigo-600">Rs {item.productId.price * (item.quantity || 1)}</p>
                                                </div>
                                                <button
                                                    onClick={() => confirmRemoveItem(item._id)}
                                                    className="w-full py-2 bg-rose-50 text-rose-600 rounded-xl font-bold flex items-center justify-center gap-2"
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={confirmClearCart}
                                className="px-8 py-3 bg-white text-rose-600 border-2 border-rose-50 rounded-2xl font-bold hover:bg-rose-50 transition-all active:scale-95 shadow-lg shadow-rose-100/20"
                            >
                                Clear All Items
                            </button>
                        </div>

                        {/* Order Summary Checkout */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-indigo-100/50 border border-indigo-50 sticky top-32">
                                <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Order Summary</h3>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-slate-500 font-medium">
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span className="text-slate-900">Rs {calculateTotalPrice()}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 font-medium">
                                        <span>Shipping</span>
                                        <span className="text-emerald-500 font-bold">FREE</span>
                                    </div>
                                    <div className="h-px bg-slate-100 my-4"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-slate-900">Total Amount</span>
                                        <span className="text-3xl font-black text-indigo-600">Rs {calculateTotalPrice()}</span>
                                    </div>
                                </div>
                                <button className="w-full bg-indigo-600 text-white py-5 rounded-[1.25rem] text-lg font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95">
                                    Proceed to Checkout
                                </button>
                                <p className="text-center text-xs text-slate-400 mt-6 font-bold tracking-widest uppercase">
                                    Secure SSL Checkout
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-20 rounded-[3rem] shadow-xl shadow-slate-100 border border-slate-50 text-center">
                        <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <FontAwesomeIcon icon={faTrash} className="text-slat-200 text-4xl" />
                        </div>
                        <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Your cart is empty</h3>
                        <p className="text-slate-500 text-lg mb-10 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet.</p>
                        <Link to="/shop">
                            <Button size="xl" pill className="bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 shadow-lg px-8 py-2 mx-auto">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Modals using Flowbite React */}
                <Modal show={showRemoveModal} onClose={() => setShowRemoveModal(false)} size="md" popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-rose-500" />
                            <h3 className="mb-5 text-lg font-bold text-slate-900">
                                Are you sure you want to remove this item?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={handleRemoveItem} className="font-bold">
                                    Yes, Remove
                                </Button>
                                <Button color="gray" onClick={() => setShowRemoveModal(false)} className="font-bold">
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal show={showClearModal} onClose={() => setShowClearModal(false)} size="md" popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-rose-500" />
                            <h3 className="mb-5 text-lg font-bold text-slate-900">
                                Are you sure you want to clear your entire cart?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={handleClearCart} className="font-bold">
                                    Yes, Clear Everything
                                </Button>
                                <Button color="gray" onClick={() => setShowClearModal(false)} className="font-bold">
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

export default Cart;
