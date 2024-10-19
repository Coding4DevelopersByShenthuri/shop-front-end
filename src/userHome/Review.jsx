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
    <div className='my-12 px-4 lg:px-24'>
        <h2 className='text-5xl font-bold text-center mb-10 leading-snug'>Our Customers</h2>

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
        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {/* text */}
                <div className='mt-7'>
                    <p className='mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, fugit rerum doloribus minima officiis reiciendis perspiciatis cum quia aspernatur! Molestiae, aliquam suscipit. Culpa, est minima? Dolores quod libero cumque! Quibusdam?</p>
                    <Avatar
                        alt="avatar of Jese"
                        img={proPic}
                        rounded
                        className='w-10 mb-4'
                    />
                    <h5 className='text-lg font-medium'>John Lee</h5>
                    <p  className='text-base'>Software Engineer</p>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {/* text */}
                <div className='mt-7'>
                    <p className='mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, fugit rerum doloribus minima officiis reiciendis perspiciatis cum quia aspernatur! Molestiae, aliquam suscipit. Culpa, est minima? Dolores quod libero cumque! Quibusdam?</p>
                    <Avatar
                        alt="avatar of Jese"
                        img={proPic}
                        rounded
                        className='w-10 mb-4'
                    />
                    <h5 className='text-lg font-medium'>Liza</h5>
                    <p  className='text-base'>Designer</p>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {/* text */}
                <div className='mt-7'>
                    <p className='mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, fugit rerum doloribus minima officiis reiciendis perspiciatis cum quia aspernatur! Molestiae, aliquam suscipit. Culpa, est minima? Dolores quod libero cumque! Quibusdam?</p>
                    <Avatar
                        alt="avatar of Jese"
                        img={proPic}
                        rounded
                        className='w-10 mb-4'
                    />
                    <h5 className='text-lg font-medium'>Rex</h5>
                    <p  className='text-base'>Doctor</p>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {/* text */}
                <div className='mt-7'>
                    <p className='mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, fugit rerum doloribus minima officiis reiciendis perspiciatis cum quia aspernatur! Molestiae, aliquam suscipit. Culpa, est minima? Dolores quod libero cumque! Quibusdam?</p>
                    <Avatar
                        alt="avatar of Jese"
                        img={proPic}
                        rounded
                        className='w-10 mb-4'
                    />
                    <h5 className='text-lg font-medium'>Jese</h5>
                    <p  className='text-base'>Engineer</p>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {/* text */}
                <div className='mt-7'>
                    <p className='mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, fugit rerum doloribus minima officiis reiciendis perspiciatis cum quia aspernatur! Molestiae, aliquam suscipit. Culpa, est minima? Dolores quod libero cumque! Quibusdam?</p>
                    <Avatar
                        alt="avatar of Jese"
                        img={proPic}
                        rounded
                        className='w-10 mb-4'
                    />
                    <h5 className='text-lg font-medium'>Jesica</h5>
                    <p  className='text-base'>Teacher</p>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {/* text */}
                <div className='mt-7'>
                    <p className='mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, fugit rerum doloribus minima officiis reiciendis perspiciatis cum quia aspernatur! Molestiae, aliquam suscipit. Culpa, est minima? Dolores quod libero cumque! Quibusdam?</p>
                    <Avatar
                        alt="avatar of Jese"
                        img={proPic}
                        rounded
                        className='w-10 mb-4'
                    />
                    <h5 className='text-lg font-medium'>Lyca</h5>
                    <p  className='text-base'>Banker</p>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {/* text */}
                <div className='mt-7'>
                    <p className='mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, fugit rerum doloribus minima officiis reiciendis perspiciatis cum quia aspernatur! Molestiae, aliquam suscipit. Culpa, est minima? Dolores quod libero cumque! Quibusdam?</p>
                    <Avatar
                        alt="avatar of Jese"
                        img={proPic}
                        rounded
                        className='w-10 mb-4'
                    />
                    <h5 className='text-lg font-medium'>Linga</h5>
                    <p  className='text-base'>Manager</p>
                </div>
            </div>
        </SwiperSlide>
    </Swiper>
        </div>
    </div>
  )
}

export default Review;