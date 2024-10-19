import React from 'react'
import Banner from '../components/Banner'
import BestSellerProducts from './BestSellerProducts'
import FavProduct from './FavProduct'
import PromoBanner from './PromoBanner'
import OtherProducts from './OtherProducts'
import Review from './Review'

const userHome = () => {
  return (
    <div>
      <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
        <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
          {/* left side */}
          <div className='md:w-1/2 space-y-8 h-full'>
            Welcome to user dashboard
          </div>
        </div>
      </div>
    </div>
  )
}

export default userHome;
