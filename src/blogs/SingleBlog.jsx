import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import './SingleBlog.css';

const SingleBlog = () => {
  const blog = useLoaderData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (loading) return <div className="single-blog-loading">Loading...</div>;
  if (error) return <div className="single-blog-error">{error}</div>;
  if (!blog) return null;

  return (
    <div className="single-blog-page-container page-container">
      <div className="shape shape3-bottom-left">
      </div>

      {/* <div className="shape shape3-bottom-right">
      </div> */}
      <div className="single-blog-container">
        <h2 className="single-blog-title">{blog.title}</h2>
        {blog.imageUrl && (
          <img src={blog.imageUrl} alt={blog.title} className="single-blog-image" />
        )}
        <p className="single-blog-content">{blog.content}</p>
        <h3 className="single-blog-tags">Tags:</h3>
        <ul className="single-blog-tag-list">
          {blog.tags && blog.tags.map((tag, index) => (
            <li key={index} className="single-blog-tag-item">{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleBlog;
