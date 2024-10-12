import React from 'react';
import FavProductImg from "../assets/favoriteproduct.jpg";
import { Link } from 'react-router-dom';

const FavProduct = () => {
  return (
    <div className='px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-12'>
        <div className='md:w-1/2'>
            <img src={FavProductImg} alt="" className='rounded md:w-10/12' />
        </div>

        <div className='md:w-1/2 space-y-6'>
            <h2 className='text-5xl font-bold my-5 md:w-3/4 leading-snug'>Find Your Preferable <span className='text-blue-700'>Product Here!</span></h2>
            <p className='mb-10 text-lg md:w-5/6'>Looking for your next great find? Discover your favorite products here, where quality and convenience meet! 
            Whether you're searching for everyday essentials, fresh produce, or exciting new arrivals, our wide selection has something for every need. 
            Explore a variety of categories and uncover the products that fit your lifestyle. The perfect item is just waiting to be found – start shopping today!</p>
            {/* stats */}
            <div className='flex flex-col sm:flex-row justify-between gap-6 md:w-3/4 my-14'>
                <div>
                    <h3 className='text-3xl font-bond'>800+</h3>
                    <p className='text-base'>Products Listening</p>
                </div>
                <div>
                    <h3 className='text-3xl font-bond'>550+</h3>
                    <p className='text-base'>Register Users</p>
                </div>
                <div>
                    <h3 className='text-3xl font-bond'>100+</h3>
                    <p className='text-base'>Branches</p>
                </div>
            </div>

            <Link to="/shop" className='mt-12 block'>
             <button className='bg-blue-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300'>Explore</button>
            </Link>  
        </div>
    </div>
  );
}

export default FavProduct;

