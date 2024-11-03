import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleBlog = () => {
  const { blogId } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs/${blogId}`);
        setBlog(response.data);
      } catch (err) {
        setError('Error fetching the blog. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!blog) return null;

  return (
    <div className="single-blog bg-teal-100">
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
  );
};

export default SingleBlog;
