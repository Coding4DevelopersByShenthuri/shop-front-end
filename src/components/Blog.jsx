// src/pages/Blog.jsx
import React from 'react';
import '../components/Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Benefits of Organic Products",
      summary: "Discover why organic products are better for your health and the environment.",
      image: "../src/assets/organic-product.jpg",
      date: "October 10, 2024"
    },
    {
      id: 2,
      title: "How to Shop Smart on a Budget",
      summary: "Learn how to make the most of your shopping without breaking the bank.",
      image: "../src/assets/budget-shopping.jpg",
      date: "September 30, 2024"
    },
    {
      id: 3,
      title: "Healthy Eating Habits for a Busy Lifestyle",
      summary: "Find out how to maintain healthy eating habits even with a hectic schedule.",
      image: "../src/assets/healthy-eating.webp",
      date: "August 20, 2024"
    },
    {
      id: 4,
      title: "Meal Prep for the Week: Tips and Tricks",
      summary: "Master meal prep with these easy tips to save time and eat healthy.",
      image: "../src/assets/meal-prep.avif",
      date: "October 15, 2024"
    },
    {
      id: 5,
      title: "The Importance of Hydration",
      summary: "Learn how staying hydrated can improve your health and well-being.",
      image: "../src/assets/hydration.webp",
      date: "October 20, 2024"
    },
    {
      id: 6,
      title: "5 Easy Healthy Snacks for Kids",
      summary: "Discover quick and nutritious snack ideas your kids will love.",
      image: "../src/assets/healthy-snacks.jpeg",
      date: "October 25, 2024"
    },
    {
      id: 7,
      title: "Understanding Food Labels: What to Look For",
      summary: "Get the facts on reading food labels to make informed choices.",
      image: "../src/assets/food-labels.webp",
      date: "November 1, 2024"
    },
    {
      id: 8,
      title: "The Benefits of Home Cooking",
      summary: "Explore why cooking at home can lead to healthier meals.",
      image: "../src/assets/home-cooking.jpg",
      date: "November 5, 2024"
    },
    {
      id: 9,
      title: "Understanding Nutritional Labels: A Beginner's Guide",
      summary: "A comprehensive guide to help you read and understand nutritional labels.",
      image: "../src/assets/nutritional-labels.png",
      date: "November 10, 2024"
    }
  ];

  return (
    <div className="Blog-page">
      <div className="blog-container">
        <h1 className="blog-title">Our Latest Blog Posts</h1>
        
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-card">
              <img src={post.image} alt={post.title} className="blog-image" />
              <div className="blog-content">
                <h2 className="blog-post-title">{post.title}</h2>
                <p className="blog-summary">{post.summary}</p>
                <p className="blog-date">{post.date}</p>
                <a 
                  href={`https://www.google.com/search?q=${encodeURIComponent(post.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="read-more"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
