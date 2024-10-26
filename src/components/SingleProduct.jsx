import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
  const { id } = useParams(); // Access the product ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch product details based on the ID
    fetch(`http://localhost:3000/product/product/${id}`)
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

  // Function to handle adding product to wishlist
  const handleAddToWishlist = () => {
    fetch('http://localhost:3000/wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include authorization if needed
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust this based on your auth method
      },
      body: JSON.stringify({ productId: id }), // Send the product ID
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to add product to wishlist');
        }
        return res.json();
      })
      .then(data => {
        console.log('Product added to wishlist:', data);
        alert('Product added to wishlist!'); // Optionally notify the user
      })
      .catch(error => {
        console.error('Error adding product to wishlist:', error);
        alert(error.message); // Optionally notify the user of the error
      });
  };

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
          {/* Button to add to wishlist */}
          <button onClick={handleAddToWishlist}>Add to Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
