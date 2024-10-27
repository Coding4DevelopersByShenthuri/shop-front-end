import React, { useEffect, useState } from 'react';
import './Blog.css'; // Ensure this is the correct path to your CSS file
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]); // State to hold blog data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const [expandedBlog, setExpandedBlog] = useState(null); // State for the expanded blog
  const [selectedCategory, setSelectedCategory] = useState('All'); // State for selected category

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/blogs'); // Adjust the endpoint as needed
        setBlogs(response.data);
      } catch (err) {
        setError('Error fetching blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Function to handle expanding a blog for detailed view
  const handleExpandBlog = (blog) => {
    setExpandedBlog(blog);
  };

  // Filter blogs based on the selected category
  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter(blog => blog.category === selectedCategory);

  // Loading and error states
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="Blog-page">
      <h1 className="blogs-title font-serif">Our Latest Blogs</h1> 
      <div className="blogs-container">
        {/* Category Selection */}
        <div className="category-filter">
          <button onClick={() => setSelectedCategory('All')}>
            <span className="material-icons">grid_view</span> All📊
          </button>
          <button onClick={() => setSelectedCategory('Technology')}>
            <span className="material-icons">devices</span> Technology💻
          </button>
          <button onClick={() => setSelectedCategory('Health')}>
            <span className="material-icons">local_hospital</span> Health🏥
          </button>
          <button onClick={() => setSelectedCategory('Lifestyle')}>
            <span className="material-icons">spa</span> Lifestyle🌿
          </button>
          <button onClick={() => setSelectedCategory('Budgeting')}>
            <span className="material-icons">money</span> Budgeting💰
          </button>
        </div>

        <div className="blogs-grid">
          {filteredBlogs.map((blog) => (
            <div
              className="blog-card"
              key={blog._id}
              onClick={() => handleExpandBlog(blog)}
            >
              {blog.imageUrl && (
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="blog-image"
                />
              )}
              <h2 className="blog-title">{blog.title}</h2>
              <p className="blog-content">
                {blog.content && blog.content.length > 100
                  ? `${blog.content.slice(0, 100)}...`
                  : blog.content || 'No content available.'}
              </p>
              <h3>Tags:</h3>
              <ul className="tags-list">
                {blog.tags && blog.tags.slice(0, 3).map((tag, index) => (
                  <li key={index}>{tag}</li> // Custom bullet can be styled in CSS
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Detailed view for the expanded blog */}
        {expandedBlog && (
          <div className="blog-detail-view">
            <h2 className="detail-title">{expandedBlog.title}</h2>
            {expandedBlog.imageUrl && (
              <img
                src={expandedBlog.imageUrl}
                alt={expandedBlog.title}
                className="detail-image"
              />
            )}
            <h3>Content:</h3>
            <p>{expandedBlog.content || 'No content available.'}</p>
            <h3>Tags:</h3>
            <ul className="tags-list">
              {expandedBlog.tags && expandedBlog.tags.map((tag, index) => (
                <li key={index}>{tag}</li> // Custom bullet can be styled in CSS
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
