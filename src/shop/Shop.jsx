import React, { useContext, useEffect, useState } from 'react';
import { Card, Modal } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBroom, faAppleAlt, faWineBottle, faFish, faSnowflake, faWheatAwn, faLeaf, faPizzaSlice, faDrum,
  faCheese, faCarrot, faHeart, faToggleOff, faToggleOn
} from '@fortawesome/free-solid-svg-icons';
import './Shop.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { useAppCountContext } from '../services/countService';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [modalContent, setModalContent] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isBeverageVisible, setIsBeverageVisible] = useState(true);
  const [isFruitsVisible, setIsFruitsVisible] = useState(true);
  const [isDairyVisible, setIsDairyVisible] = useState(true);
  const [isVegetablesVisible, setIsVegetablesVisible] = useState(true);
  const [isMeatVisible, setIsMeatVisible] = useState(true);
  const [isCannedVisible, setIsCannedVisible] = useState(true);
  const [isCleanersVisible, setIsCleanersVisible] = useState(true);
  const [isSnacksVisible, setIsSnacksVisible] = useState(true);
  const [isFrozenVisible, setIsFrozenVisible] = useState(true);
  const [isGrainsVisible, setIsGrainsVisible] = useState(true);
  const [isLeafyVisible, setIsLeafyVisible] = useState(true);


  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { updateWishlistCount, updateCartCount } = useAppCountContext();
  const searchQuery = new URLSearchParams(location.search).get('search') || '';

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/product/all-products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false); 
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      const filtered = products.filter(product =>
        (isBeverageVisible || product.category !== 'Beverage') &&
        (isDairyVisible || product.category !== 'Dairy') &&
        (isFruitsVisible || product.category !== 'Fruits') &&
        (isVegetablesVisible || product.category !== 'Vegetables') &&
        (isMeatVisible || product.category !== 'Meat') &&
        (isCannedVisible || product.category !== 'Canned') &&
        (isCleanersVisible || product.category !== 'Cleaners') &&
        (isSnacksVisible || product.category !== 'Snacks') &&
        (isFrozenVisible || product.category !== 'Frozen') &&
        (isGrainsVisible || product.category !== 'Grains') &&
        (isLeafyVisible || product.category !== 'Leafy')
      );

      if (searchQuery) {
        const searchFiltered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(searchFiltered);
      } else {
        setFilteredProducts(filtered);
      }
    }
  }, [searchQuery, products, loading, isBeverageVisible, isDairyVisible, isFruitsVisible, isVegetablesVisible, isMeatVisible, isCannedVisible, isCleanersVisible, isSnacksVisible, isFrozenVisible, isGrainsVisible, isLeafyVisible]);


  const [activeCategories, setActiveCategories] = useState([]);

  const toggleFilterVisibility = (category) => {
    setActiveCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };
 


  const handleAddToWishlist = async (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/wishlists/add-list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product._id, userId: user.userDetails[0]?._id }),
      });
      if (response.ok) {
        updateWishlistCount(user.userDetails[0]?._id);
        setModalContent(`Added ${product.name} to your wishlist!`);
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000);
      } else {
        setMessage('Failed to add product to wishlist.');
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000);
      }
    } catch (error) {
      setMessage('An error occurred while adding to wishlist.');
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
    }
  };

  const handleQuantityChange = (productId, value) => {
    const quantityValue = Math.max(1, value); // Ensure minimum quantity is 1
    setQuantities({
      ...quantities,
      [productId]: quantityValue
    });
  };


  const handleAddToCart = async (product) => {
    const quantity = quantities[product._id] || 1; // Default to 1 if no quantity set
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/carts/add-cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product._id, userId: user.userDetails[0]?._id, quantity: quantity }),
      });
      if (response.ok) {
        updateCartCount(user.userDetails[0]?._id);
        setModalContent(`${product.name} x ${quantity} added to cart.`);
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000); // Hide modal after 2 seconds
      } else {
        setMessage('Failed to add product to cart.');
      }
    } catch (error) {
      setMessage('An error occurred while adding to cart.');
    }
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
      <div className="shape shape-top-left">
      </div>
      <div className="shape shape-bottom-left">
      </div>
      <div className='mt-28 px-4 lg:px-24'>
        <h2 className='text-5xl font-bold text-center font-serif mb-12'>All Products are here!</h2>
      {/* Category Icons at the Top */}
      <div className="flex justify-center gap-8 my-8">
  <div className="flex flex-col items-center">
    <button onClick={() => scrollToCategory('Beverage')} className="category-icon">
      <FontAwesomeIcon icon={faWineBottle} className="text-4xl" />
      <p>Beverage</p>
    </button>
    <button onClick={() => toggleFilterVisibility('Beverage')} className="toggle-switch" style={{ fontSize: '25px' }}>
      <FontAwesomeIcon icon={isBeverageVisible ? faToggleOff : faToggleOn} />
    </button>
  </div>

  <div className="flex flex-col items-center">
    <button onClick={() => scrollToCategory('Dairy')} className="category-icon">
      <FontAwesomeIcon icon={faCheese} className="text-4xl" />
      <p>Dairy</p>
    </button>
    <button onClick={() => toggleFilterVisibility('Dairy')} className="toggle-switch" style={{ fontSize: '25px' }}>
      <FontAwesomeIcon icon={!activeCategories.includes('Dairy') ? faToggleOff : faToggleOn} />
    </button>
  </div>

  <div className="flex flex-col items-center">
    <button onClick={() => scrollToCategory('Grains')} className="category-icon">
      <FontAwesomeIcon icon={faWheatAwn} className="text-4xl" />
      <p>Grains</p>
    </button>
    <button onClick={() => toggleFilterVisibility('Grains')} className="toggle-switch" style={{ fontSize: '25px' }}>
      <FontAwesomeIcon icon={isGrainsVisible ? faToggleOff : faToggleOn} />
    </button>
  </div>

  <div className="flex flex-col items-center">
    <button onClick={() => scrollToCategory('Vegetables')} className="category-icon">
      <FontAwesomeIcon icon={faCarrot} className="text-4xl" />
      <p>Vegetables</p>
    </button>
    <button onClick={() => toggleFilterVisibility('Vegetables')} className="toggle-switch" style={{ fontSize: '25px' }}>
      <FontAwesomeIcon icon={isVegetablesVisible ? faToggleOff : faToggleOn} />
    </button>
  </div>

  <div className="flex flex-col items-center">
    <button onClick={() => scrollToCategory('Frozen')} className="category-icon">
      <FontAwesomeIcon icon={faSnowflake} className="text-4xl" />
      <p>Frozen</p>
    </button>
    <button onClick={() => toggleFilterVisibility('Frozen')} className="toggle-switch" style={{ fontSize: '25px' }}>
      <FontAwesomeIcon icon={isFrozenVisible ? faToggleOff : faToggleOn} />
    </button>
  </div>

  <div className="flex flex-col items-center">
    <button onClick={() => scrollToCategory('Fruits')} className="category-icon">
      <FontAwesomeIcon icon={faAppleAlt} className="text-4xl" />
      <p>Fruits</p>
    </button>
    <button onClick={() => toggleFilterVisibility('Fruits')} className="toggle-switch" style={{ fontSize: '25px' }}>
      <FontAwesomeIcon icon={isFruitsVisible ? faToggleOff : faToggleOn} />
    </button>
  </div>

  <div className="flex flex-col items-center">
    <button onClick={() => scrollToCategory('Cleaners')} className="category-icon">
      <FontAwesomeIcon icon={faBroom} className="text-4xl" />
      <p>Cleaners</p>
    </button>
    <button onClick={() => toggleFilterVisibility('Cleaners')} className="toggle-switch" style={{ fontSize: '25px' }}>
      <FontAwesomeIcon icon={isCleanersVisible ? faToggleOff : faToggleOn} />
    </button>
  </div>

  <div className="flex flex-col items-center">
    <button onClick={() => scrollToCategory('Meat')} className="category-icon">
      <FontAwesomeIcon icon={faFish} className="text-4xl" />
      <p>Meat</p>
    </button>
    <button onClick={() => toggleFilterVisibility('Meat')} className="toggle-switch" style={{ fontSize: '25px' }}>
      <FontAwesomeIcon icon={isMeatVisible ? faToggleOff : faToggleOn} />
    </button>
  </div>

  <div className="flex flex-col items-center">
    <button onClick={() => scrollToCategory('Canned')} className="category-icon">
      <FontAwesomeIcon icon={faDrum} className="text-4xl" />
      <p>Canned</p>
    </button>
    <button onClick={() => toggleFilterVisibility('Canned')} className="toggle-switch" style={{ fontSize: '25px' }}>
      <FontAwesomeIcon icon={isCannedVisible ? faToggleOff : faToggleOn} />
    </button>
  </div>

  <div className="flex flex-col items-center">
    <button onClick={() => scrollToCategory('Leafy')} className="category-icon">
      <FontAwesomeIcon icon={faLeaf} className="text-4xl" />
      <p>Leafy</p>
    </button>
    <button onClick={() => toggleFilterVisibility('Leafy')} className="toggle-switch" style={{ fontSize: '25px' }}>
      <FontAwesomeIcon icon={isLeafyVisible ? faToggleOff : faToggleOn} />
    </button>
  </div>

  <div className="flex flex-col items-center">
    <button onClick={() => scrollToCategory('Snacks')} className="category-icon">
      <FontAwesomeIcon icon={faPizzaSlice} className="text-4xl" />
      <p>Snacks</p>
    </button>
    <button onClick={() => toggleFilterVisibility('Snacks')} className="toggle-switch" style={{ fontSize: '25px' }}>
      <FontAwesomeIcon icon={isSnacksVisible ? faToggleOff : faToggleOn} />
    </button>
  </div>
</div>

        {loading ? (

          <div className="flex items-center justify-center h-screen" role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>

        ) : (
          <>

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
                        Per: {product.unit}
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
          </>
        )}


        {/* Modal for confirmation message */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
              <p className="text-lg font-semibold text-gray-800">{modalContent}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
