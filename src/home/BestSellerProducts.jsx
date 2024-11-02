import React, { useEffect, useState } from 'react'
import ProductCards from '../components/ProductCards';

const BestSellerProducts = () => {
    const [products, setProducts] = useState([]);
  
    useEffect( () => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/product/all-products`).then(res => res.json()).then(data => setProducts(data.slice(0, 8)))
    },  [])
  return (
    <div>
        <ProductCards products={products} headline="Best Seller Products"/>
    </div>
  )
}

export default BestSellerProducts;
