import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';

// Import images from assets if possible, or use placeholders if they don't exist
// based on the CSS: Banner1.jpg to Banner5.jpg
import Banner1 from '../assets/banner/Banner1.jpg';
import Banner2 from '../assets/banner/Banner2.jpg';
import Banner3 from '../assets/banner/Banner3.jpg';
import Banner4 from '../assets/banner/Banner4.jpg';
import Banner5 from '../assets/banner/Banner5.jpg';

function BannerCard() {
  const images = [Banner1, Banner2, Banner3, Banner4, Banner5];

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-xl">
      {/* Decorative background blur */}
      <div className="absolute inset-0 bg-indigo-200 blur-[80px] opacity-20 transform -rotate-12 scale-110"></div>
      
      <div className="relative group rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-200/50 border-8 border-white">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination, Autoplay]}
          className="w-full h-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="h-[450px] md:h-[550px] w-full bg-slate-100 overflow-hidden">
                <img 
                  src={img} 
                  alt={`Banner ${index + 1}`} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2000ms]"
                  onError={(e) => {
                    e.target.src = `https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800&h=1000`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modern floating badge */}
      <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-white p-6 rounded-[2.5rem] shadow-2xl border border-slate-50 hidden md:block animate-bounce-slow">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl">
               <span className="font-black italic">S!</span>
            </div>
            <div>
               <p className="text-sm font-black text-slate-900 leading-none">Premium Quality</p>
               <p className="text-xs text-slate-400 font-bold mt-1">Sourced Daily</p>
            </div>
         </div>
      </div>
    </div>
  );
}

export default BannerCard;
