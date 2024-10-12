import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
  const { id } = useParams(); // Access the product ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch product details based on the ID
    fetch(`http://localhost:3000/product/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then(data => {
        console.log("Fetched product data:", data);  // Log the data to verify
        setProduct(data);
      })
      .catch(error => {
        console.error("Error fetching product data:", error);
        setError(error.message);
      });
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Name: {product.name}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <img 
          src={product.imageURL} 
          alt={`Image of ${product.name}`} 
          style={{ width: '300px', height: 'auto' }} 
        />
        {/* Display additional product details next to the image */}
        <div>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Stock:</strong> {product.stock_quantity} {product.unit}</p>
          <p><strong>Origin:</strong> {product.origin}</p>
          <p><strong>Price:</strong> Rs {product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
