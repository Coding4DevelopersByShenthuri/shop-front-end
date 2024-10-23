import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// React icons
import { FaBarsStaggered, FaBlog, FaXmark } from 'react-icons/fa6';
import { AuthContext } from '../contexts/AuthProvider'; 

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setSticky] = useState(false);
    const { user,logOut } = useContext(AuthContext);

    
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
    }, [isMenuOpen]);

    // Navigation items
    const navItems = [
        { link: 'Home', path: '/' },
        { link: 'About', path: '/about' },
        { link: 'Shop', path: '/shop' },
    //  { link: 'Admin', path: '/admin/dashboard' },
        { link: 'Contact Us', path: '/contact'},
        { link: 'Recipes', path: '/recipe'},
        { link: 'Blog', path: '/blog' },
        { link: 'Help', path: '/help'},
    ];

    return (
        <header className='w-full bg-transparent fixed top-0 right-0 left-0 transition-all ease-in duration-300'>
            <nav className={`py-4 lg:px-24 px-4 ${isSticky ? 'sticky top-0 left-0 right-0 bg-blue-300' : ''}`}>
                <div className='flex justify-between items-center text-base gap-8'>
                    {/* Logo */}
                    <Link to='/' className='text-2xl font-bold text-blue-700 flex items-center gap-2'>
                        <FaBlog className='inline-block' />Shenthu MART
                    </Link>

                    {/* Nav items for large devices */}
                    <ul className='md:flex space-x-12 hidden'>
                        {navItems.map(({ link, path }) => (
                            <li key={path}>
                                <Link to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>
                                    {link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {/* Sign Up button for large devices */}
                    {!user && <div className='hidden lg:flex items-center'>
                        <Link 
                            to='/sign-up' 
                            className='px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition'>
                            Signup
                        </Link>
                        <Link 
                            to='/login' 
                            className='px-4 py-2 text-white bg-green-600 rounded hover:bg-blue-700 transition ml-4 mr-4'>
                            Login
                        </Link>
                        <button aria-label="Toggle menu" onClick={toggleMenu}>
                            <FaBarsStaggered className='w-5 hover:text-blue-700' />
                        </button>
                    </div>}
                    {user && user.userDetails && user?.userDetails[0]?.role === 'user' && <div className='hidden lg:flex items-center'>
                        <Link 
                            to='/user/dashboard/overview' 
                            className='px-4 py-2 text-black bg-yellow-300 rounded hover:bg-blue-700 transition'>
                            User Dashboard
                        </Link>
                        <button 
                            onClick={logOut} 
                            className='px-4 py-2 text-white focus:outline-none bg-red-600 rounded hover:bg-blue-700 transition ml-4 mr-4' 
                        >
                            Logout
                        </button>
                        <button aria-label="Toggle menu" onClick={toggleMenu}>
                            <FaBarsStaggered className='w-5 hover:text-blue-700' />
                        </button>
                    </div>}
                    {user && user.userDetails && user?.userDetails[0]?.role === 'admin' && <div className='hidden lg:flex items-center'>
                        <Link 
                            to='/admin/dashboard/overview' 
                            className='px-4 py-2 text-black bg-yellow-300 rounded hover:bg-blue-700 transition'>
                            Admin Dashboard
                        </Link>
                        <button 
                            onClick={logOut} 
                            className='px-4 py-2 text-white focus:outline-none bg-red-600 rounded hover:bg-blue-700 transition ml-4 mr-4' 
                        >
                            Logout
                        </button>
                        <button aria-label="Toggle menu" onClick={toggleMenu}>
                            <FaBarsStaggered className='w-5 hover:text-blue-700' />
                        </button>
                    </div>}
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
                <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? 'block fixed top-0 right-0 left-0' : 'hidden'}`}>
                    {navItems.map(({ link, path }) => (
                        <Link key={path} to={path} className='block text-base text-white uppercase cursor-pointer'>
                            {link}
                        </Link>
                    ))}

                    {/* Sign Up button for mobile devices */}
                    <Link 
                        to='/sign-up' 
                        className='block text-base text-white uppercase cursor-pointer bg-blue-600 px-4 py-2 rounded'>
                        Sign Up
                    </Link>
                    
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
