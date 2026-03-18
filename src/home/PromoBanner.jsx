import React from 'react';
import { Link } from 'react-router-dom';
import Cart from "../assets/Cart.png";
function PromoBanner() {
  return (
    <div className='mt-24 py-16 bg-gradient-to-r from-indigo-600 to-indigo-800 px-4 md:px-12 lg:px-24 rounded-3xl mx-4 md:mx-12 lg:mx-24 shadow-2xl shadow-indigo-200 overflow-hidden relative'>
        {/* Background Decorative patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

        <div className='flex flex-col lg:flex-row justify-between items-center gap-12 relative z-10'>
            <div className='lg:w-3/5 text-center lg:text-left'>
                <h2 className='text-3xl md:text-5xl font-extrabold text-white mb-6 leading-[1.2] font-sans'>
                    Indulge in your favorite snacks <span className="text-indigo-200 underline decoration-indigo-300">without breaking the bank!</span>
                </h2>
                <p className="text-indigo-100 text-lg md:text-xl font-medium mb-8 max-w-2xl lg:mx-0 mx-auto leading-relaxed">
                    Our exclusive offers bring you the best discount prices on a wide selection of delicious treats. Unbeatable deals delivered right to your doorstep.
                </p>
                <Link to="/shop" className='inline-block'>
                    <button className='bg-white text-indigo-700 font-extrabold px-10 py-4 rounded-2xl hover:bg-indigo-50 transition-all duration-300 shadow-xl shadow-indigo-900/20 active:scale-95'>
                        Claim Your Discount Now
                    </button>
                </Link>  
            </div>

            <div className="lg:w-2/5 flex justify-center lg:justify-end">
                <img 
                    src={Cart} 
                    alt="Promotional Shopping Cart" 
                    className="w-full max-w-[400px] h-auto object-contain drop-shadow-2xl transform hover:rotate-3 transition-transform duration-500"
                />
            </div>
        </div>
    </div>
  );
}

export default PromoBanner;