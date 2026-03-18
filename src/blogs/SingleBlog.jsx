import React, { useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { Badge, Button } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClock, faUser, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import blogPlaceholder from '../assets/product-placeholder.png'; // Using the same premium placeholder for consistency

const SingleBlog = () => {
  const blog = useLoaderData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100 text-center max-w-md">
        <p className="text-rose-600 font-bold">{error}</p>
        <Link to="/blog" className="mt-4 inline-block text-indigo-600 font-bold hover:underline">Back to Blogs</Link>
      </div>
    </div>
  );

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Header */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img 
          src={blog.imageUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80'} 
          alt={blog.title} 
          className="w-full h-full object-cover filter brightness-[0.7]"
          onError={(e) => {
            e.target.src = blogPlaceholder;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        <div className="absolute bottom-10 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold mb-6 transition-colors">
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Stories
          </Link>
          <Badge color="indigo" size="lg" className="w-fit mb-4 px-4 py-1 font-bold uppercase tracking-widest">
            {blog.category || 'Lifestyle'}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter drop-shadow-sm">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-50 space-y-10">
          <div className="flex flex-wrap items-center gap-8 text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-indigo-600">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <span>By Adminstrator</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-indigo-400" />
              <span>Oct 24, 2023</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} className="text-indigo-400" />
              <span>8 Min Read</span>
            </div>
          </div>

          <div className="prose prose-indigo prose-xl max-w-none text-slate-600 font-medium leading-loose whitespace-pre-wrap">
            {blog.content}
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="pt-10 border-t border-slate-50">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Explored Topics</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="bg-slate-50 text-slate-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-default">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-indigo-600 rounded-[2rem] p-8 md:p-12 text-white text-center space-y-6">
            <h3 className="text-3xl font-black">Enjoyed this perspective?</h3>
            <p className="text-indigo-100 font-medium max-w-lg mx-auto leading-relaxed text-lg">
              Join our exclusive community of shoppers and thinkers to get the latest insights delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button color="white" size="xl" pill className="font-black px-8">
                Subscribe Weekly
              </Button>
              <Link to="/blog">
                <Button color="indigo" size="xl" pill className="font-black px-8 border-2 border-white/20 hover:bg-white/10">
                  More Stories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
