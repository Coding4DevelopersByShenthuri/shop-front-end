import React from 'react';
import { Link } from 'react-router-dom';
import Cart from "../assets/Cart.png";
function PromoBanner() {
  return (
    <div className='mt-16 py-12 bg-teal-100 px-4 lg:px-24'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-12'>
            <div className='md:w-1/2'>
                <h2 className='text-3xl font-bond mb-6 leading-snug'>Indulge in your favorite snacks without breaking the bank! Our exclusive offer brings you the best discount prices 
                on a wide selection of delicious treats. Whether you're craving crunchy chips, sweet candies, or savory nuts, you'll find unbeatable deals that satisfy your taste buds 
                and your wallet.</h2>
                <Link to="/shop" className='block'>
                    <button className='bg-blue-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300'>Get Promo</button>
                </Link>  
            </div>

            <div>
                <img src={Cart} alt="Promotional image for Best Discounts." style={{ width: '600px', height: '600px', position: 'relative', top: '-55px', left: '-30px' }} />
            </div>
        </div>
    </div>
  );
}

export default PromoBanner;