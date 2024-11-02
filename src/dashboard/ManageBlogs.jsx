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
    tags: [],
  });
  const [tagInput, setTagInput] = useState(''); // State for tag input
  const [error, setError] = useState(''); // State for error messages

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs`);
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
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/blogs`, blogData);
        setBlogs([...blogs, response.data]);
      }
      resetForm();
      alert(currentBlog ? 'Blog updated successfully!' : 'Blog added successfully!');
    } catch (error) {
      console.error('Failed to save blog:', error);
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
        console.error('Failed to delete post:', error);
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
    setTagInput('');
  };

  const addTag = (e) => {
    e.preventDefault();
    if (tagInput.trim()) {
      setFormValues(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput],
      }));
      setTagInput('');
    }
  };

  const deleteTag = (index) => {
    setFormValues(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Manage Blog Posts</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-gray-50 shadow-sm">
        <h2 className="text-lg font-medium mb-2">{currentBlog ? 'Edit Blog' : 'Add New Blog'}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Title"
            value={formValues.title}
            onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <textarea
            placeholder="Content"
            value={formValues.content}
            onChange={(e) => setFormValues({ ...formValues, content: e.target.value })}
            className="border p-2 rounded h-32"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={formValues.category}
            onChange={(e) => setFormValues({ ...formValues, category: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <div className="flex">
            <input
              type="text"
              placeholder="Add Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="border p-2 rounded flex-grow"
            />
            <button onClick={addTag} className="ml-2 p-2 bg-blue-500 text-white rounded">
              Add
            </button>
          </div>
          <ul className="list-disc ml-4">
            {formValues.tags.map((tag, index) => (
              <li key={index} className="flex justify-between">
                {tag}
                <button
                  onClick={() => deleteTag(index)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Image URL"
            value={formValues.imageUrl}
            onChange={(e) => setFormValues({ ...formValues, imageUrl: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button type="submit" className="mt-4 flex items-center space-x-1 p-2 bg-blue-500 text-white rounded">
          <PlusCircleIcon className="h-5 w-5" />
          <span>{currentBlog ? 'Update Blog' : 'Add Blog'}</span>
        </button>
      </form>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog._id} className="border rounded-lg p-4 shadow-sm">
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-32 object-cover rounded mb-4" />
            <h3 className="text-lg font-semibold mb-1">{blog.title}</h3>
            <p className="text-gray-700 mb-2">{typeof blog.content === 'string' ? blog.content.substring(0, 100) + '...' : 'Content not available'}</p>
            <p className="text-gray-600 mb-2"><strong>Category:</strong> {blog.category}</p>
            <p className="text-gray-600 mb-2"><strong>Tags:</strong> {blog.tags.join(', ')}</p>
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
