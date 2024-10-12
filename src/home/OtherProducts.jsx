import React, { useEffect, useState } from 'react'
import ProductCards from '../components/ProductCards';

const OtherProducts = () => {
    const [products, setProducts] = useState([]); // Renamed to products
  
    useEffect(() => {
        fetch("http://localhost:3000/all-products")
          .then(res => res.json())
          .then(data => setProducts(data.slice(0, 8))); // Updated to setProducts
    }, []);

    return (
      <div>
          <ProductCards products={products} headline="Other Products" /> {/* Passing products */}
      </div>
    );
}

export default OtherProducts;

