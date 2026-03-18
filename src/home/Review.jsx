import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// react icons
import {FaStar } from "react-icons/fa6";
import { Avatar } from 'flowbite-react';
import proPic from "../assets/profile.jpg"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

const Review = () => {
  return (
    <div className='my-16 px-4 md:px-12 lg:px-24'>
        <div className="text-center mb-16">
            <h2 className='text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-sans mb-4'>What Our Clients Say</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">Join thousands of satisfied shop owners who have transformed their business with our management system.</p>
        </div>

        <div>
    <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]} 
        className="mySwiper"
      >
        <SwiperSlide className='bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 m-2'>
            <div className='space-y-6'>
                <div className='text-amber-400 flex gap-1'>
                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                </div>
                <div className='mt-4 italic text-slate-600 leading-relaxed font-medium'>
                    "The inventory management is seamless. We've reduced waste by 30% since we started using this system. Highly recommended for any retail business!"
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                    <Avatar img={proPic} rounded className='w-12 h-12 border-2 border-indigo-100' />
                    <div>
                        <h5 className='text-lg font-bold text-slate-900'>John Lee</h5>
                        <p className='text-sm font-bold text-indigo-600 uppercase tracking-wider'>Retail Manager</p>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 m-2'>
            <div className='space-y-6'>
                <div className='text-amber-400 flex gap-1'>
                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                </div>
                <div className='mt-4 italic text-slate-600 leading-relaxed font-medium'>
                    "The analytics dashboard gives us real-time insights into our sales performance. It's the most professional tool we've ever used."
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                    <Avatar img={proPic} rounded className='w-12 h-12 border-2 border-indigo-100' />
                    <div>
                        <h5 className='text-lg font-bold text-slate-900'>Sarah Jenkins</h5>
                        <p className='text-sm font-bold text-indigo-600 uppercase tracking-wider'>Operations Head</p>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 m-2'>
            <div className='space-y-6'>
                <div className='text-amber-400 flex gap-1'>
                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                </div>
                <div className='mt-4 italic text-slate-600 leading-relaxed font-medium'>
                    "Face recognition attendance has made our staff management so much easier and more secure. Absolutely brilliant feature!"
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                    <Avatar img={proPic} rounded className='w-12 h-12 border-2 border-indigo-100' />
                    <div>
                        <h5 className='text-lg font-bold text-slate-900'>Michael Chen</h5>
                        <p className='text-sm font-bold text-indigo-600 uppercase tracking-wider'>Store Owner</p>
                    </div>
                </div>
            </div>
        </SwiperSlide>
    </Swiper>
        </div>
    </div>
  )
}

export default Review;
