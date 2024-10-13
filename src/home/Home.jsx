import React from 'react'
import Banner from '../components/Banner'
import BestSellerProducts from './BestSellerProducts'
import FavProduct from './FavProduct'
import PromoBanner from './PromoBanner'
import OtherProducts from './OtherProducts'
import Review from './Review'

const Home = () => {
  return (
    <div>
      <Banner/>
      <BestSellerProducts/>
      <FavProduct/>
      <PromoBanner/>
      <OtherProducts/>
      <Review/>
      <p>test</p>
    </div>
  )
}

export default Home;
