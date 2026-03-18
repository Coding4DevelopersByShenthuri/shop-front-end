import React from 'react';
import { Badge } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import Supermarket3 from '../assets/Supermarket3.jpg';
import Supermarket2 from '../assets/Bg.jpg';
import Supermarket1 from '../assets/Supermarket1.jpg';
import Slider from 'react-slick'; // Import Slider from react-slick
import './About.css'; // Import the CSS file for styles
import "slick-carousel/slick/slick.css"; // Slick-carousel base styles
import "slick-carousel/slick/slick-theme.css"; // Slick-carousel theme styles

const About = () => {
  const images = [Supermarket3, Supermarket2, Supermarket1];

  const settings = {
    dots: true, // Enable navigation dots
    infinite: true, // Loop through images infinitely
    speed: 500, // Transition speed
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1, // Scroll one image at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Change images every 3 seconds
    pauseOnHover: true, // Pause the slider when hovered
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="h-[70vh]">
                <img
                  src={image}
                  alt={`Shenthuri Shop Hero ${index + 1}`}
                  className="w-full h-full object-cover filter brightness-50"
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-4 font-sans drop-shadow-lg">
            About Our <span className="text-indigo-400">Shop</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 font-medium max-w-2xl mx-auto drop-shadow-md">
            Where Quality Meets Convenience Since 2010.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8">
            <Badge color="indigo" size="lg" className="w-fit px-4 py-1 font-bold uppercase tracking-widest">Our Story</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Driven by Passion, Built for the <span className="text-indigo-600">Community.</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
              <p>
                Welcome to our store, where quality meets convenience! We take pride in being more than just a supermarket — we are your trusted partner in daily essentials, offering a curated selection of products that cater to your every need.
              </p>
              <p>
                Our journey started with a simple mission: to bring the freshest, highest-quality products to our customers, all while providing an exceptional shopping experience. Whether you’re searching for fresh produce, pantry staples, or specialty items, we’ve got you covered.
              </p>
              <p>
                At the heart of our business is our commitment to excellence. We collaborate with local farmers and suppliers to ensure that our offerings are not only fresh and affordable but also sustainable.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-200 border-8 border-indigo-50">
              <img src={Supermarket1} alt="Our Store" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-indigo-600 p-8 rounded-3xl text-white shadow-xl hidden md:block">
              <p className="text-4xl font-black mb-1">14+</p>
              <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Years of Trust</p>
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="bg-slate-50 rounded-[3rem] p-8 md:p-16 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6 font-sans">Our Mission</h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                Our mission is to provide high-quality products at affordable prices while promoting sustainability and supporting local communities. We strive to make every shopping experience pleasant and enjoyable.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6 font-sans">Our Values</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Quality", desc: "Highest standards always." },
                  { title: "Community", desc: "Local farmer support." },
                  { title: "Sustainability", desc: "Eco-friendly mindset." },
                  { title: "Satisfaction", desc: "Your happiness first." }
                ].map((val) => (
                  <li key={val.title} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <p className="font-black text-indigo-600">{val.title}</p>
                    <p className="text-sm text-slate-500 font-medium">{val.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-slate-900 mb-12 font-sans">Voice of Our Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 italic text-slate-600 relative">
              <span className="text-8xl text-indigo-100 absolute top-4 left-4 font-serif leading-none">“</span>
              <p className="relative z-10 text-lg font-medium">"I always find what I need at this supermarket! The staff is incredibly friendly and helpful. It truly feels like home."</p>
              <p className="mt-6 text-indigo-600 font-black not-italic text-sm uppercase tracking-wider">— Happy Customer</p>
            </div>
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 italic text-slate-600 relative">
              <span className="text-8xl text-indigo-100 absolute top-4 left-4 font-serif leading-none">“</span>
              <p className="relative z-10 text-lg font-medium">"The quality of the products is exceptional, and I love supporting local businesses. A world-class shopping experience."</p>
              <p className="mt-6 text-indigo-600 font-black not-italic text-sm uppercase tracking-wider">— Satisfied Shopper</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
