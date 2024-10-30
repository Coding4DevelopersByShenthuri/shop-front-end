import React from 'react';
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
    <div className="about-background">
      <div style={{
        padding: '60px 20px',
        maxWidth: '1500px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        color: 'black'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontFamily: 'serif',
          fontSize: '55px',
          marginBottom: '40px',
          paddingTop: '60px' // Add some padding at the top
        }}>
          About Us
        </h1>

        <div className="shape shape-top-left">
        </div>
        <div className="shape shape-bottom-left">
        </div>

        {/* Slider Component */}
        <div style={{ marginBottom: '40px' }}>
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Supermarket ${index + 0.5}`}
                  style={{
                    width: '50%', // Adjusted width to 80%
                    height: '400px', // Adjusted height to 400px
                    objectFit: 'cover',
                    borderRadius: '10px',
                    margin: '0 auto' // Center the image
                  }}
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* About Content */}
        <div className="about-content">
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>
            Welcome to our store, where quality meets convenience! We take pride in being more than just a supermarket — we are your trusted partner in daily essentials, offering a curated selection of products that cater to your every need. Our journey started with a simple mission: to bring the freshest, highest-quality products to our customers, all while providing an exceptional shopping experience. Whether you’re searching for fresh produce, pantry staples, or specialty items, we’ve got you covered.
          </p>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>
            At the heart of our business is our commitment to excellence. We collaborate with local farmers and suppliers to ensure that our offerings are not only fresh and affordable but also sustainable. Our team is passionate about making shopping easy, accessible, and enjoyable for everyone. We believe in fostering strong relationships with our customers, and your satisfaction is our top priority.
          </p>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>
            Thank you for choosing us as your go-to destination for all your shopping needs. We are continuously evolving, innovating, and expanding to serve you better. We look forward to being part of your daily life and helping you live healthier, happier, and more fulfilled.
          </p>

          {/* Additional sections */}
          <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Our Mission</h2>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>
            Our mission is to provide high-quality products at affordable prices while promoting sustainability and supporting local communities. We strive to make every shopping experience pleasant and enjoyable, ensuring that our customers leave satisfied every time.
          </p>

          <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Our Values</h2>
          <ul style={{ fontSize: '18px', marginBottom: '20px' }}>
            <li>Quality: We only offer products that meet our high standards.</li>
            <li>Community: We support local farmers and businesses.</li>
            <li>Sustainability: We are committed to reducing our environmental impact.</li>
            <li>Customer Satisfaction: Your happiness is our top priority.</li>
          </ul>

          <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Meet Our Team</h2>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>
            Our team is made up of passionate individuals who are dedicated to providing the best shopping experience possible. From our friendly cashiers to our knowledgeable staff, we are here to help you find what you need.
          </p>

          <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Customer Testimonials</h2>
          <blockquote style={{ fontSize: '18px', marginBottom: '20px', fontStyle: 'italic' }}>
            "I always find what I need at this supermarket! The staff is incredibly friendly and helpful." - Happy Customer
          </blockquote>
          <blockquote style={{ fontSize: '18px', marginBottom: '20px', fontStyle: 'italic' }}>
            "The quality of the products is exceptional, and I love supporting local businesses." - Satisfied Shopper
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default About;
