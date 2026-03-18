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
    <div className="px-9 bg-slate-50 flex items-center">
      <div className="flex w-full flex-col md:flex-row justify-between items-center gap-8 py-40">
        {/* Left side */}
        <div className="md:w-1/2 space-y-8 h-full">
          <h2 className=" font-sans text-6xl font-extrabold leading-tight text-slate-900 tracking-tight">
            Buy Best Things From Here <span className="text-indigo-600">for the Best Prices</span>
          </h2>
          <p className="md:w-4/5 text-lg text-slate-600 leading-relaxed font-sans">
            Offering a wide variety of products all in one place. From fresh produce and household essentials to snacks and specialty goods, supermarkets 
            cater to the diverse needs of everyday shoppers. Whether you're looking for organic options, ready-to-eat meals, or budget-friendly items, supermarkets 
            provide a convenient shopping experience for individuals and families alike.
          </p>
          <div>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search a Product"
              className="py-2 px-4 rounded-l-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-sans"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter key
            />
            <button
              className="bg-indigo-600 px-8 py-2 text-white font-semibold rounded-r-lg hover:bg-indigo-700 transition-all shadow-md active:scale-95"
              onClick={handleSearch} // Trigger search on button click
            >
              Search
            </button>
          </div>
        </div>

        {/* Right side */}
        <div>
          <BannerCard />
        </div>
      </div>
    </div>
  );
};

export default Banner;
