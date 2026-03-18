import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Badge, Spinner, Button } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faArrowRight, faClock, faFire, faLeaf, faThLarge } from '@fortawesome/free-solid-svg-icons';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/recipes`);
        setRecipes(response.data.data || []);
      } catch (err) {
        setError('Error fetching gourmet recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const categories = [
    { name: 'All', emoji: '📊' },
    { name: 'Main course', emoji: '🍽️' },
    { name: 'Desserts', emoji: '🍨' },
    { name: 'Smoothies', emoji: '🥤' },
    { name: 'Salads', emoji: '🥗' },
    { name: 'Cakes', emoji: '🍰' },
    { name: 'Cookies', emoji: '🍪' },
  ];

  const filteredRecipes = selectedCategory === 'All'
    ? recipes
    : recipes.filter(recipe => recipe.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Spinner size="xl" />
        <p className="mt-4 text-slate-500 font-medium animate-pulse">Loading culinary inspirations...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge color="indigo" size="lg" className="w-fit mx-auto px-4 py-1 uppercase tracking-widest font-bold">Culinary Lab</Badge>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
            Cook with our <span className="text-indigo-600">Fresh Products</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Gourmet recipes designed to elevate your home cooking experience using our finest ingredients.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 border-2 ${
                selectedCategory === cat.name
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100'
                  : 'bg-white border-transparent text-slate-600 hover:border-indigo-200 hover:text-indigo-600'
              }`}
            >
              {cat.name} {cat.emoji}
            </button>
          ))}
        </div>

        {error ? (
          <div className="bg-rose-50 border-2 border-rose-100 p-8 rounded-[2rem] text-center text-rose-600 font-bold">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <div
                  key={recipe._id}
                  onClick={() => navigate(`/recipes/${recipe._id}`)}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80'}
                      alt={recipe.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge color="indigo" size="sm" className="font-bold px-3 py-1 rounded-xl shadow-lg border-2 border-white/50 backdrop-blur-sm">
                        {recipe.category || 'Recipe'}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faClock} className="text-indigo-400" /> 35 MINS
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faFire} className="text-rose-400" /> MEDIUM
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight line-clamp-1">
                      {recipe.title}
                    </h2>

                    <p className="text-slate-500 font-medium leading-relaxed line-clamp-2 italic">
                      {recipe.description || 'A delightful culinary journey using our freshest ingredients.'}
                    </p>

                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex -space-x-2">
                         {[1,2,3].map(i => (
                           <div key={i} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-400">
                             <FontAwesomeIcon icon={faUtensils} size="xs" />
                           </div>
                         ))}
                      </div>
                      <span className="text-indigo-600 font-black flex items-center gap-2 group-hover:gap-3 transition-all">
                        View Recipe <FontAwesomeIcon icon={faArrowRight} />
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-24 text-center bg-white rounded-[4rem] shadow-xl border border-slate-50">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={faThLarge} className="text-slate-200 text-4xl" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-2">No recipes found</h3>
                <p className="text-slate-500 font-medium mb-10">We're still cooking up something special for this category.</p>
                <Button onClick={() => setSelectedCategory('All')} color="indigo" pill size="xl" className="px-10 font-black mx-auto">
                  Explore All Recipes
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
