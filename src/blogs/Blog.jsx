import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Badge, Spinner, Button } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser, faTag, faArrowRight, faThLarge, faLaptopCode, faHeartbeat, faLeaf, faCoins, faUtensils, faSpa } from '@fortawesome/free-solid-svg-icons';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs`);
        setBlogs(response.data);
      } catch (err) {
        setError('We encountered an issue fetching our latest stories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = [
    { name: 'All', icon: faThLarge, emoji: '📊' },
    { name: 'Technology', icon: faLaptopCode, emoji: '💻' },
    { name: 'Health', icon: faHeartbeat, emoji: '🏥' },
    { name: 'Lifestyle', icon: faSpa, emoji: '🌿' },
    { name: 'Budgeting', icon: faCoins, emoji: '💰' },
    { name: 'Healthy Eating', icon: faUtensils, emoji: '🥗' },
    { name: 'Nutrition', icon: faLeaf, emoji: '🥕' },
  ];

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter(blog => blog.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Spinner size="xl" />
        <p className="mt-4 text-slate-500 font-medium animate-pulse">Loading latest stories...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge color="indigo" size="lg" className="w-fit mx-auto px-4 py-1 uppercase tracking-widest font-bold">Editorial</Badge>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
            Insights & <span className="text-indigo-600">Inspirations</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Deep dives into technology, wellness, and the art of modern living.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 border-2 ${
                selectedCategory === cat.name
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100'
                  : 'bg-white border-transparent text-slate-600 hover:border-indigo-200 hover:text-indigo-600'
              }`}
            >
              <FontAwesomeIcon icon={cat.icon} className="text-sm" />
              <span>{cat.name} {cat.emoji}</span>
            </button>
          ))}
        </div>

        {error ? (
          <div className="bg-rose-50 border-2 border-rose-100 p-8 rounded-[2rem] text-center">
            <p className="text-rose-600 font-bold">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <article
                  key={blog._id}
                  onClick={() => navigate(`/blogs/${blog._id}`)}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={blog.imageUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80'}
                      alt={blog.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge color="indigo" size="sm" className="font-bold px-3 py-1 rounded-xl shadow-lg">
                        {blog.category || 'Story'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-4">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faClock} /> 5 min read
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faUser} /> Admin
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight line-clamp-2">
                      {blog.title}
                    </h2>

                    <p className="text-slate-500 font-medium leading-relaxed line-clamp-3">
                      {blog.content || 'Explore this fascinating story and discover new perspectives on modern living and wellness.'}
                    </p>

                    <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                      <div className="flex gap-2">
                        {blog.tags && blog.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="text-[10px] font-black uppercase tracking-tighter text-indigo-400 bg-indigo-50 px-2 py-1 rounded-lg">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-indigo-600 font-black flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read Story <FontAwesomeIcon icon={faArrowRight} />
                      </span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-[3rem] shadow-xl border border-slate-50">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={faThLarge} className="text-slate-200 text-3xl" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">No blogs found</h3>
                <p className="text-slate-500 font-medium mb-8">Try selecting a different category or check back later.</p>
                <Button onClick={() => setSelectedCategory('All')} color="indigo" pill className="px-8 font-black mx-auto">
                  Show All Stories
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
