import React from 'react';
import BannerCard from '../home/BannerCard';

const Banner = () => {
  return (
    <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
      <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
        {/* left side */}
        <div className='md:w-1/2 space-y-8 h-full'>
          <h2 className='text-5xl font-bold leading-snug text-black'>
            Buy Best Things From Here <span className='text-blue-700'>for the Best Prices</span>
          </h2>
          <p className='md:w-4/5'>
          Offering a wide variety of products all in one place. From fresh produce and household essentials to snacks and specialty goods, supermarkets 
          cater to the diverse needs of everyday shoppers. Whether you're looking for organic options, ready-to-eat meals, or budget-friendly items, supermarkets 
          provide a convenient shopping experience for individuals and families alike. With easy access to a range of brands and products, they play a vital role in simplifying 
          our daily lives and ensuring we have everything we need under one roof. Ready to fill your cart?
          </p>
          <div>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search a Product"
              className="py-2 px-2 rounded-l-sm"
            />
            <button className='bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200'>
              Search
            </button>
          </div>
        </div>

        {/* right side */}
        <div>
          <BannerCard />
        </div>
      </div>
    </div>
  );
};

export default Banner;
