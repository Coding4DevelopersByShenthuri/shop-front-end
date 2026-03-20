import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

//import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

import { FaCartShopping } from 'react-icons/fa6';
import { HiArrowSmRight } from 'react-icons/hi';
import productPlaceholder from '../assets/product-placeholder.png';

const ProductCards = ({ headline, products }) => {
    
    return (
    <div className='my-8 md:my-16 px-4 md:px-12 lg:px-24'>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-10 gap-4">
            <h2 className='text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-sans'>{headline}</h2>
            <Link to="/shop" className="text-indigo-600 font-bold hover:underline flex items-center gap-2">
                View All Products
                <HiArrowSmRight />
            </Link>
        </div>

        {/* cards */}
        <div className='mt-12'>
    <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
        }}
        modules={[Pagination]}
        className="mySwiper w-full h-full"
      >
        {
            products.map(product => (
            <SwiperSlide key={product._id}>
                <Link to={`/product/${product._id}`} className="group block h-full">
                    <div className='relative overflow-hidden rounded-2xl bg-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-indigo-100/50'>
                        <img 
                            src={product.imageURL} 
                            alt={product.name} 
                            className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                                e.target.src = productPlaceholder;
                            }}
                        />
                        <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-indigo-600 p-3 rounded-xl shadow-lg transform translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
                            <FaCartShopping className='w-5 h-5'/>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className='mt-5 space-y-2 px-1'>
                        <p className='text-xs font-bold text-indigo-600 uppercase tracking-widest'>{product.category}</p>
                        <h3 className='text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1'>{product.name}</h3>
                        <div className="flex items-center justify-between">
                            <p className='text-xl font-black text-slate-900'>Rs {product.price}</p>
                            <div className="flex items-center gap-1 text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                                In Stock
                            </div>
                        </div>
                    </div>
                </Link>
            </SwiperSlide>
            ))
        }
    </Swiper>
        </div>
    </div>
    );
};

export default ProductCards;