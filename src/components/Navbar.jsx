import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBarsStaggered, FaBlog, FaXmark, FaHeart } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthProvider';
import { useAppCountContext } from '../services/countService';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setSticky] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    // State to manage the wishlist count and cart counts
    const { wishlistCount, updateWishlistCount, cartCount, updateCartCount } = useAppCountContext();


    // Toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    // Close menu on outside click
    const handleClickOutside = (event) => {
        if (isMenuOpen && !event.target.closest('.menu-container')) {
            setIsMenuOpen(false);
        }
    };

    const handleClick = () => {
        if (user) {
            navigate('/wishlists');
        } else {
            navigate('/login');
        }
    };

    const handleCartClick = () => {
        if (user) {
            navigate('/carts');
        } else {
            navigate('/login');
        }
    };

    // Fetch the wishlist count
    useEffect(() => {
        if (user) {
            updateCartCount(user?.userDetails[0]?._id)
            updateWishlistCount(user?.userDetails[0]?._id)
        }
    }, [user, updateCartCount, updateWishlistCount]);

     useEffect(() => {
         const handleScroll = () => {
             setSticky(window.scrollY > 100);
         };

         window.addEventListener('scroll', handleScroll);
         document.addEventListener('click', handleClickOutside);

         return () => {
             window.removeEventListener('scroll', handleScroll);
             document.removeEventListener('click', handleClickOutside);
         };
     }, []);

    // Navigation items
    const navItems = [
        { link: 'Home', path: '/' },
        { link: 'About', path: '/about' },
        { link: 'Shop', path: '/shop' },
        { link: 'Contact', path: '/contact' },
        { link: 'Recipes', path: '/recipe' },
        { link: 'Blog', path: '/blog' },
        { link: 'Help', path: '/help' },
    ];

    return (
        <header className='font-sans w-full bg-transparent fixed top-0 right-0 left-0 transition-all ease-in duration-300'>
            <nav className={`py-4 px-9 ${isSticky ? 'sticky top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100' : ''}`}>
                <div className='flex justify-between items-center text-base gap-9'>
                    {/* Logo */}
                    <Link to='/' className='text-3xl font-bold text-indigo-700 flex items-center gap-2 font-sans'>
                        <FaBlog className='inline-block' /> <span className="tracking-tight">Shenthu MART</span>
                    </Link>

                    {/* Nav items for large devices */}
                    <ul className='md:flex space-x-12 hidden pl-8'>
                        {navItems.map(({ link, path }) => (
                            <li key={path}>
                                <Link to={path} className='block text-sm text-gray-700 uppercase font-bold cursor-pointer hover:text-indigo-700 transition-colors'>
                                    {link}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Wishlist icon with dynamic count */}
                    <button onClick={handleClick} type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white text-red-500 hover:text-red-700 transition">
                        <FaHeart className='w-6 h-6' />
                        <span className="sr-only">Wishlist items</span>
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -end-1 dark:border-gray-900">
                            {wishlistCount}
                        </div>
                    </button>

                    {/* Cart icon with dynamic count */}
                    <button onClick={handleCartClick} type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-blue-500 hover:text-blue-700 transition">
                        <FaShoppingCart className='w-6 h-6' />
                        <span className="sr-only">Cart items</span>
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-500 border-2 border-white rounded-full -top-1 -end-1">
                            {cartCount}
                        </div>
                    </button>

                    {/* Sign Up and Login for large devices */}
                    {!user && (
                        <div className='hidden lg:flex items-center gap-4'>
                            <Link
                                to='/sign-up'
                                className='px-5 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm transition-all font-bold'>
                                Signup
                            </Link>
                            <Link
                                to='/login'
                                className='px-5 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-sm transition-all font-bold'>
                                Login
                            </Link>
                        </div>
                    )}
                    {/* User-specific buttons */}
                    {user && user.userDetails && user?.userDetails[0]?.role === 'user' && (
                        <div className='hidden lg:flex items-center'>
                            <Link
                                to='/user/dashboard/overview'
                                className='px-4 py-2 text-black bg-yellow-300 rounded hover:bg-blue-700 transition font-bold text-center'>
                                User
                            </Link>
                            <button
                                onClick={logOut}
                                className='px-4 py-2 text-white focus:outline-none bg-red-600 rounded hover:bg-blue-700 transition ml-4 mr-4 font-bold'>
                                Logout
                            </button>
                        </div>
                    )}

                    {user && user.userDetails && user?.userDetails[0]?.role === 'admin' && (
                        <div className='hidden lg:flex items-center'>
                            <Link
                                to='/admin/dashboard/overview'
                                className='px-4 py-2 text-black bg-yellow-300 rounded hover:bg-blue-700 transition font-bold text-center'>
                                Admin
                            </Link>
                            <button
                                onClick={logOut}
                                className='px-4 py-2 text-white focus:outline-none bg-red-600 rounded hover:bg-blue-700 transition ml-3 mr-3 font-bold'>
                                Logout
                            </button>
                        </div>
                    )}
                    {/* Menu button for mobile devices */}
                    <div className='md:hidden'>
                        <button
                            onClick={toggleMenu}
                            className='text-black focus:outline-none'
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMenuOpen ? <FaXmark className='h-5 w-5 text-black' /> : <FaBarsStaggered className='h-5 w-5 text-black' />}
                        </button>
                    </div>
                </div>

                {/* Nav items for small devices */}
                <div className={`space-y-4 px-8 mt-20 py-10 bg-slate-900/95 backdrop-blur-xl border-l border-white/10 ${isMenuOpen ? 'fixed top-0 right-0 bottom-0 w-80 shadow-2xl transition-all duration-500 transform translate-x-0' : 'fixed top-0 right-0 bottom-0 w-80 transition-all duration-500 transform translate-x-full'}`}>
                    <div className="flex justify-end mb-8">
                         <button onClick={() => setIsMenuOpen(false)} className="text-white/50 hover:text-white transition-colors">
                            <FaXmark className="h-8 w-8" />
                         </button>
                    </div>
                    {navItems.map(({ link, path }) => (
                        <Link key={path} to={path} onClick={() => setIsMenuOpen(false)} className='block text-lg text-white/70 hover:text-white uppercase font-black tracking-widest cursor-pointer transition-all hover:translate-x-2'>
                            {link}
                        </Link>
                    ))}

                    <div className="pt-8 border-t border-white/10 mt-8 space-y-4">
                        {!user ? (
                            <>
                                <Link
                                    to='/sign-up'
                                    onClick={() => setIsMenuOpen(false)}
                                    className='block text-center py-4 text-white bg-indigo-600 rounded-2xl font-black uppercase tracking-widest'>
                                    Sign Up
                                </Link>
                                <Link
                                    to='/login'
                                    onClick={() => setIsMenuOpen(false)}
                                    className='block text-center py-4 text-white border-2 border-white/10 rounded-2xl font-black uppercase tracking-widest hover:bg-white/5'>
                                    Login
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={() => { logOut(); setIsMenuOpen(false); }}
                                className='w-full text-center py-4 text-white bg-rose-600 rounded-2xl font-black uppercase tracking-widest'>
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
