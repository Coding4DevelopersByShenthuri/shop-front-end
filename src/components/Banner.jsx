import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BannerCard from '../home/BannerCard';

const Banner = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Redirect to search results page with search term as a query parameter
    if (searchTerm.trim()) {
      navigate(`/shop?search=${searchTerm.trim()}`);
    }
  };

  return (
    <div className="px-4 md:px-12 lg:px-24 bg-gradient-to-br from-slate-50 to-indigo-50/30 flex items-center overflow-hidden">
      <div className="flex w-full flex-col lg:flex-row justify-between items-center gap-12 py-12 md:py-32 lg:py-40">
        {/* Left side */}
        <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
            Buy Best Things From Here <span className="text-indigo-600 block sm:inline">for the Best Prices</span>
          </h2>
          <p className="mx-auto lg:mx-0 max-w-2xl text-base md:text-lg text-slate-600 leading-relaxed font-medium font-sans">
            Offering a wide variety of products all in one place. From fresh produce and household essentials to snacks and specialty goods, our marketplace 
            caters to your every need with a premium shopping experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-0 max-w-md mx-auto lg:mx-0">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="What are you looking for?"
              className="w-full sm:w-auto flex-1 py-3 px-6 rounded-l-xl border-2 border-transparent bg-white shadow-sm focus:border-indigo-500 focus:ring-0 transition-all font-sans text-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              className="w-full sm:w-auto bg-indigo-600 px-8 py-3 text-white font-bold rounded-r-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 whitespace-nowrap"
              onClick={handleSearch}
            >
              Search Now
            </button>
          </div>
          
          <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">10k+</p>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Products</p>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">50k+</p>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Customers</p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="lg:w-1/2 w-full max-w-lg lg:max-w-none">
          <BannerCard />
        </div>
      </div>
    </div>
  );
};

export default Banner;
