import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import axios from 'axios';
import './SingleBlog.css';

const SingleBlog = () => {
  const blog = useLoaderData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!blog) return null;

  return (
    <div className="single-blog-page-container">
      <div className='w-full max-w-[1200px] mx-auto px-4 lg:px-24 mt-16'>
      <h2>{blog.title}</h2>
      {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} />}
      <p>{blog.content}</p>
      <h3>Tags:</h3>
      <ul>
        {blog.tags && blog.tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default SingleBlog;
