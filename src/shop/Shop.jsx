import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBroom, faAppleAlt, faWineBottle, faFish, faSnowflake, faWheatAwn, 
  faCheese, faCarrot, faHeart 
} from '@fortawesome/free-solid-svg-icons'; 
import './shop.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]); 
  const [quantities, setQuantities] = useState({}); 
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get('search') || '';

  useEffect(() => {
    fetch('http://localhost:3000/product/all-products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      }); 
  }, []);

  useEffect(() => {
    // Filter products by search query
    if (searchQuery) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Reset to all products if no query
    }
  }, [searchQuery, products]);

  const handleAddToWishlist = async (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
        const response = await fetch('http://localhost:3000/wishlists/add-list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId: product._id, userId: user.userDetails[0]?._id }),
        });

        if (response.ok) {
            const data = await response.json();
            setMessage(`Added to your wishlist!`);
        } else {
            setMessage('Failed to add product to wishlist.');
        }
    } catch (error) {
        setMessage('An error occurred while adding to wishlist.');
    } 
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities({
      ...quantities,
      [productId]: value
    });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1; // Default to 1 if no quantity set
    alert(`Added ${quantity} of ${product.name} to the cart!`); // Optional: Replace with actual cart logic
  };

  // Group products by category
  const groupedProducts = filteredProducts.reduce((acc, product) => {
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
        <h2 className='text-5xl font-bold text-center font-serif mb-12'>All Products are here!</h2>

        {/* Category Icons at the Top */}
        <div className="flex justify-center gap-6 my-8">
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
            <h3 className='text-4xl font-semibold mb-6'>{category}</h3>
            <div className='grid gap-8 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
              {groupedProducts[category].map((product) => (
                <Card key={product._id} className="w-full">
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
                  <div className='flex justify-between mt-4'>
                    <input
                      type="number"
                      min="1"
                      value={quantities[product._id] || 1} // Default value
                      onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                      className="border rounded px-2 py-1 w-16 text-center"
                    />
                    <button onClick={() => handleAddToCart(product)} className='bg-blue-700 font-semibold text-white py-3 px-8 rounded'>
                      Buy Now
                    </button>
                    <button onClick={() => handleAddToWishlist(product)} className='text-red-500'>
                      <FontAwesomeIcon icon={faHeart} className="text-3xl" />
                    </button>
                  </div>
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
