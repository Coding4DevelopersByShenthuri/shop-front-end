import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faBroom, faAppleAlt, faWineBottle, faFish, faSnowflake, faWheatAwn, faCheese, faCarrot } from '@fortawesome/free-solid-svg-icons'; // Example Icons
import './shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/product/all-products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  // Scroll to the category section
  const scrollToCategory = (category) => {
    document.getElementById(category)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='shop-page'>
      <div className='mt-28 px-4 lg:px-24'>
        <h2 className='text-5xl font-bold text-center'>All Products are here!</h2>

        {/* Category Icons at the Top */}
        <div className="flex justify-center gap-6 my-8">
          {/* Add icons for each category and link them to the corresponding section */}
          <button onClick={() => scrollToCategory('Beverage')} className="category-icon">
            <FontAwesomeIcon icon={faWineBottle} className="text-4xl" />
            <p>Beverage</p>
          </button>
          <button onClick={() => scrollToCategory('Dairy')} className="category-icon">
            <FontAwesomeIcon icon={faCheese} className="text-4xl" />
            <p>Dairy</p>
          </button>
          <button onClick={() => scrollToCategory('Grains')} className="category-icon">
            <FontAwesomeIcon icon={faWheatAwn} className="text-4xl" />
            <p>Grains</p>
          </button>
          <button onClick={() => scrollToCategory('Vegetables')} className="category-icon">
            <FontAwesomeIcon icon={faCarrot} className="text-4xl" />
            <p>Vegetables</p>
          </button>
          <button onClick={() => scrollToCategory('Frozen Foods')} className="category-icon">
            <FontAwesomeIcon icon={faSnowflake} className="text-4xl" />
            <p>Frozen Foods</p>
          </button>
          <button onClick={() => scrollToCategory('Fruits')} className="category-icon">
            <FontAwesomeIcon icon={faAppleAlt} className="text-4xl" />
            <p>Fruits</p>
          </button>
          <button onClick={() => scrollToCategory('Cleaning Supplies')} className="category-icon">
            <FontAwesomeIcon icon={faBroom} className="text-4xl" />
            <p>Cleaning Supplies</p>
          </button>
          <button onClick={() => scrollToCategory('Meat')} className="category-icon">
            <FontAwesomeIcon icon={faFish} className="text-4xl" />
            <p>Meat</p>
          </button>
        </div>

        {/* Iterate over grouped products by category */}
        {Object.keys(groupedProducts).map((category) => (
          <div key={category} id={category} className="my-12">
            {/* Display Category Name */}
            <h3 className='text-4xl font-semibold mb-6'>{category}</h3>
            <div className='grid gap-8 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
              {groupedProducts[category].map((product) => (
                <Card key={product._id} className="w-full">
                  {/* Adjusted the image styles */}
                  <img 
                    src={product.imageURL} 
                    alt={`${product.name} cover`} 
                    className='h-80 w-full object-cover' 
                    style={{ maxHeight: '400px', objectFit: 'cover' }} 
                  />
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-4">
                    {product.name}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400 mt-2">
                    {product.description || "Grab Now!. Just Have a Look People"}
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                    Rs {product.price}
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                    {product.unit}
                  </p>
                  <button className='bg-blue-700 font-semibold text-white py-2 rounded'>Buy Now</button>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
