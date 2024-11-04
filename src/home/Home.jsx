import React from 'react'
import Banner from '../components/Banner'
import './Home.css';
import BestSellerProducts from './BestSellerProducts'
import FavProduct from './FavProduct'
import PromoBanner from './PromoBanner'
import OtherProducts from './OtherProducts'
import Review from './Review'

const Home = () => {
  return (
    <div className='home-container'>
      <div className="shape shape-top-left"></div>
      <div className="shape shape-bottom-left"></div>
      <div className="shape shape-bottom-right"></div>
      <div className="shape shape6-bottom-left"></div>
      <div className="shape shape6-bottom-right"></div>
      <div className="shape shape6-top-left"></div>
      <Banner/>
      <BestSellerProducts/>
      <FavProduct/>
      <PromoBanner/>
      <OtherProducts/>
      <Review/>
    </div>
  )
}

export default Home;
