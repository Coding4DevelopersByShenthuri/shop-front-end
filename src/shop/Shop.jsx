import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
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

  return (
    <div className='shop-page'> {/* Class for background color */}
      <div className='mt-28 px-4 lg:px-24'> {/* Ensure content is wrapped here */}
        <h2 className='text-5xl font-bold text-center'>All Products are here!</h2>

        {/* Iterate over grouped products by category */}
        {Object.keys(groupedProducts).map((category) => (
          <div key={category} className="my-12">
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
