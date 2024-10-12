import React from 'react';
import Supermarket3 from '../assets/Supermarket3.jpg';
import Supermarket2 from '../assets/Supermarket2.webp'; 
import Supermarket1 from '../assets/Supermarket1.jpg'; 

const About = () => {
  return (
    <div style={{ backgroundColor: 'white', padding: '60px 20px', maxWidth: '1500px', margin: '0 auto', fontFamily: 'Arial, sans-serif', color: 'black' }}>
      {/* Center and style the heading */}
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Georgia, serif', fontSize: '42px', marginBottom: '40px', color: 'blue' }}>
        About Us
      </h1>
      
      {/* Image container with flexbox for layout */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
        <img 
          src={Supermarket3} 
          alt='Supermarket3' 
          style={{ width: '200px', height: '200px', borderRadius: '5%', marginRight: '20px' }} 
        />
        <img 
          src={Supermarket2} 
          alt='Supermarket4' 
          style={{ width: '200px', height: '200px', borderRadius: '5%', marginRight: '20px' }} 
        />
        <img 
          src={Supermarket1} 
          alt='Supermarket5' 
          style={{ width: '200px', height: '200px', borderRadius: '5%' }} 
        />
      </div>

      <p style={{ fontSize: '18px', marginBottom: '20px' }}>
        Welcome to our store, where quality meets convenience! We take pride in being more than just a supermarket — we are your trusted partner in daily essentials, offering a curated selection of products that cater to your every need. Our journey started with a simple mission: to bring the freshest, highest-quality products to our customers, all while providing an exceptional shopping experience. Whether you’re searching for fresh produce, pantry staples, or specialty items, we’ve got you covered.
      </p>
      <p style={{ fontSize: '18px', marginBottom: '20px' }}>
        At the heart of our business is our commitment to excellence. We collaborate with local farmers and suppliers to ensure that our offerings are not only fresh and affordable but also sustainable. Our team is passionate about making shopping easy, accessible, and enjoyable for everyone. We believe in fostering strong relationships with our customers, and your satisfaction is our top priority.
      </p>
      <p style={{ fontSize: '18px', marginBottom: '20px' }}>
        Thank you for choosing us as your go-to destination for all your shopping needs. We are continuously evolving, innovating, and expanding to serve you better. We look forward to being part of your daily life and helping you live healthier, happier, and more fulfilled.
      </p>
    </div>
  );
};

export default About;
