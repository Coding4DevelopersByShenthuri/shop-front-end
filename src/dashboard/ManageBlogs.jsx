import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircleIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

function ManageBlogs() {
  const [blogs, setBlogs] = useState([]); // State to hold blog data
  const [currentBlog, setCurrentBlog] = useState(null); // State for the blog being edited
  const [formValues, setFormValues] = useState({ // State for form inputs
    title: '',
    content: '',
    category: '',
    imageUrl: '',
    tags: [], // Include tags in form values
  });
  const [error, setError] = useState(''); // State for error messages

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Error fetching blogs. Please try again later.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const blogData = { ...formValues };
      if (currentBlog) {
        const response = await axios.put(`http://localhost:3000/blogs/${currentBlog._id}`, blogData);
        setBlogs(blogs.map(blog => (blog._id === currentBlog._id ? response.data : blog)));
      } else {
        const response = await axios.post('http://localhost:3000/blogs', blogData);
        setBlogs([...blogs, response.data]);
      }
      resetForm();
      alert(currentBlog ? 'Blog updated successfully!' : 'Blog added successfully!');
    } catch (error) {
      console.error('Failed to save Blog:', error);
      setError('Failed to save blog. Please try again.');
    }
  };

  const handleDelete = async (blogId) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3000/blogs/${blogId}`);
        setBlogs(blogs.filter(blog => blog._id !== blogId));
        alert('Post deleted successfully!');
      } catch (error) {
        console.error('Failed to delete Post:', error);
        setError('Failed to delete post. Please try again.');
      }
    }
  };

  const handleEdit = (blog) => {
    setCurrentBlog(blog);
    setFormValues({
      title: blog.title,
      content: blog.content,
      category: blog.category,
      imageUrl: blog.imageUrl,
      tags: blog.tags || [], // Ensure tags are set for editing
    });
  };

  const resetForm = () => {
    setCurrentBlog(null);
    setFormValues({
      title: '',
      content: '',
      category: '',
      imageUrl: '',
      tags: [],
    });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Manage Blog Posts</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error messages */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-gray-50 shadow-sm">
        <h2 className="text-lg font-medium mb-2">{currentBlog ? 'Edit Blog' : 'Add New Blog'}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Title"
            value={formValues.title}
            onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Content"
            value={formValues.content}
            onChange={(e) => setFormValues({ ...formValues, content: e.target.value })}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={formValues.category}
            onChange={(e) => setFormValues({ ...formValues, category: e.target.value })}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formValues.imageUrl}
            onChange={(e) => setFormValues({ ...formValues, imageUrl: e.target.value })}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={formValues.tags.join(', ')} // Convert tags array to a string for input
            onChange={(e) => setFormValues({ ...formValues, tags: e.target.value.split(',').map(tag => tag.trim()) })} // Split and trim tags
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="mt-4 flex items-center space-x-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
          <PlusCircleIcon className="h-5 w-5" />
          <span>{currentBlog ? 'Update Blog' : 'Add Blog'}</span>
        </button>
      </form>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog._id} className="border rounded-lg p-4 shadow-sm bg-white transition transform hover:scale-105">
            {blog.imageUrl && (
              <img src={blog.imageUrl} alt={blog.title} className="w-full h-32 object-cover rounded mb-4" />
            )}
            <h3 className="text-lg font-semibold mb-1">{blog.title}</h3>
            <p className="text-gray-700 mb-2">{blog.content.length > 100 ? `${blog.content.slice(0, 100)}...` : blog.content}</p>
            <p className="text-gray-600 mb-2"><strong>Category:</strong> {blog.category}</p>
            <h4 className="text-gray-600 mb-2"><strong>Tags:</strong></h4>
            <ul className="tags-list mb-2">
              {blog.tags && blog.tags.slice(0, 3).map((tag, index) => (
                <li key={index} className="inline-block mr-2 bg-blue-100 text-blue-600 rounded px-2 py-1 text-sm">{tag}</li> // Custom bullet can be styled in CSS
              ))}
            </ul>
            <div className="flex justify-between">
              <button onClick={() => handleEdit(blog)} className="text-blue-500 hover:text-blue-700 flex items-center space-x-1">
                <EyeIcon className="h-5 w-5" />
                <span>Edit</span>
              </button>
              <button 
                onClick={() => handleDelete(blog._id)} 
                className="text-red-500 hover:text-red-700 flex items-center space-x-1"
              >
                <TrashIcon className="h-5 w-5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageBlogs;
