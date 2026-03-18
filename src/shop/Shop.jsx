import React, { useContext, useEffect, useState } from 'react';
import { Card, Modal, Button, Badge, Spinner } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBroom, faAppleAlt, faWineBottle, faFish, faSnowflake, faWheatAwn, faLeaf, faPizzaSlice, faDrum,
  faCheese, faCarrot, faHeart, faCartPlus, faEye, faFilter, faSearch
} from '@fortawesome/free-solid-svg-icons';
import './Shop.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { useAppCountContext } from '../services/countService';
import { HiOutlineExclamationCircle, HiOutlineShoppingBag } from 'react-icons/hi';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeCategories, setActiveCategories] = useState([]);

  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { updateWishlistCount, updateCartCount } = useAppCountContext();
  const searchQuery = new URLSearchParams(location.search).get('search') || '';

  const categories = [
    { name: 'Beverage', icon: faWineBottle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { name: 'Dairy', icon: faCheese, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { name: 'Grains', icon: faWheatAwn, color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Vegetables', icon: faCarrot, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Frozen', icon: faSnowflake, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { name: 'Fruits', icon: faAppleAlt, color: 'text-rose-600', bg: 'bg-rose-50' },
    { name: 'Cleaners', icon: faBroom, color: 'text-slate-600', bg: 'bg-slate-50' },
    { name: 'Meat', icon: faFish, color: 'text-red-600', bg: 'bg-red-50' },
    { name: 'Canned', icon: faDrum, color: 'text-brown-600', bg: 'bg-stone-50' },
    { name: 'Leafy', icon: faLeaf, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Snacks', icon: faPizzaSlice, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

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
      let filtered = products;
      if (searchQuery) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (activeCategories.length > 0) {
        filtered = filtered.filter(product => activeCategories.includes(product.category));
      }
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products, loading, activeCategories]);

  const toggleCategory = (categoryName) => {
    setActiveCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const clearFilters = () => setActiveCategories([]);

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
        setModalTitle("Success!");
        setModalMessage(`Added "${product.name}" to your wishlist.`);
        setShowModal(true);
      } else {
        setModalTitle("Oops!");
        setModalMessage('Failed to add product to wishlist. Please try again.');
        setShowModal(true);
      }
    } catch (error) {
      setModalTitle("Error");
      setModalMessage('Something went wrong. Please check your connection.');
      setShowModal(true);
    }
  };

  const handleQuantityChange = (productId, value) => {
    const quantityValue = Math.max(1, parseInt(value) || 1);
    setQuantities({ ...quantities, [productId]: quantityValue });
  };

  const handleAddToCart = async (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    const quantity = quantities[product._id] || 1;
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
        setModalTitle("Cart Updated");
        setModalMessage(`${quantity} x "${product.name}" added to your shopping bag.`);
        setShowModal(true);
      } else {
        setModalTitle("Failed");
        setModalMessage('Could not add item to cart. Try again later.');
        setShowModal(true);
      }
    } catch (error) {
      setModalTitle("Error");
      setModalMessage('A network error occurred while adding to cart.');
      setShowModal(true);
    }
  };

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Spinner size="xl" className="mb-4" />
        <p className="text-slate-500 font-medium animate-pulse">Curating premium products for you...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Header Section */}
      <div className="bg-white pt-28 pb-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter font-sans">
              Modern <span className="text-indigo-600">Grocery</span> Shopping
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              Discover the freshest ingredients and daily essentials curated for your world-class lifestyle.
            </p>
          </div>

          {/* Search Summary if any */}
          {searchQuery && (
            <div className="mt-8 text-center">
              <Badge color="info" size="xl" className="px-6 py-2 rounded-full inline-flex items-center gap-2">
                <FontAwesomeIcon icon={faSearch} />
                Showing results for: "{searchQuery}"
              </Badge>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter Desktop/Mobile */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <FontAwesomeIcon icon={faFilter} className="text-indigo-600" />
              Browse by Category
            </h2>
            {activeCategories.length > 0 && (
              <button onClick={clearFilters} className="text-indigo-600 font-bold hover:underline transition-all">
                Clear All Filters
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => toggleCategory(cat.name)}
                className={`flex flex-col items-center p-4 rounded-3xl transition-all duration-300 border-2 ${
                  activeCategories.includes(cat.name) 
                    ? 'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-100 -translate-y-1' 
                    : 'border-transparent bg-white hover:border-indigo-200 hover:shadow-md'
                }`}
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-2xl mb-3 ${cat.bg} ${cat.color}`}>
                  <FontAwesomeIcon icon={cat.icon} className="text-2xl" />
                </div>
                <span className={`text-xs font-black uppercase tracking-widest ${activeCategories.includes(cat.name) ? 'text-indigo-600' : 'text-slate-600'}`}>
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="space-y-20">
          {Object.keys(groupedProducts).length > 0 ? (
            Object.keys(groupedProducts).map((category) => (
              <div key={category} id={category} className="space-y-8 animate-fade-in">
                <div className="flex items-center gap-4">
                  <h3 className="text-3xl font-black text-slate-900 font-sans tracking-tight">{category}</h3>
                  <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>
                  <Badge color="gray" size="sm" className="px-3 py-1 font-bold">{groupedProducts[category].length} Items</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {groupedProducts[category].map((product) => (
                    <div key={product._id} className="group bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-xl shadow-slate-200/40 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2">
                       <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6">
                        <img 
                          src={product.imageURL} 
                          alt={product.name} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                        />
                        <button 
                          onClick={() => handleAddToWishlist(product)}
                          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl text-slate-400 hover:text-rose-500 hover:scale-110 transition-all shadow-lg"
                        >
                          <FontAwesomeIcon icon={faHeart} className={activeCategories.includes(category) ? 'text-rose-500' : ''} />
                        </button>
                        <Link 
                          to={`/product/${product._id}`}
                          className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm py-3 rounded-2xl text-slate-900 font-black text-sm text-center transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          View Details
                        </Link>
                      </div>

                      <div className="px-2 space-y-4">
                        <div>
                          <Badge color="indigo" size="xs" className="mb-2 w-fit px-2 py-0.5 rounded-lg opacity-80">{product.unit || 'Each'}</Badge>
                          <h4 className="text-xl font-extrabold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">{product.name}</h4>
                          <p className="text-slate-400 text-sm font-medium mt-1 line-clamp-1 italic">
                            {product.description || "Premium quality guaranteed."}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-2xl font-black text-slate-900">Rs {product.price}</span>
                          <div className="flex items-center gap-3">
                            <input
                              type="number"
                              min="1"
                              value={quantities[product._id] || 1}
                              onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                              className="w-14 h-12 border-none bg-slate-50 rounded-2xl text-center font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600 transition-all"
                            />
                            <button 
                              onClick={() => handleAddToCart(product)}
                              className="bg-indigo-600 text-white p-3.5 rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
                            >
                              <FontAwesomeIcon icon={faCartPlus} className="text-lg" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="py-32 text-center bg-white rounded-[4rem] shadow-xl border border-slate-50">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faSearch} className="text-slate-300 text-4xl" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-500 font-medium mb-8">We couldn't find anything matching your search or filters.</p>
              <Button onClick={clearFilters} color="indigo" pill size="xl" className="px-8 font-black mx-auto">
                Explore All Products
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} size="md" popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center p-6">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiOutlineShoppingBag className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">{modalTitle}</h3>
            <p className="text-slate-500 font-medium mb-10">{modalMessage}</p>
            <div className="grid grid-cols-2 gap-4">
              <Button color="indigo" onClick={() => setShowModal(false)} className="rounded-2xl font-bold">
                Continue
              </Button>
              <Button color="gray" onClick={() => navigate('/cart')} className="rounded-2xl font-bold">
                View Cart
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Shop;
