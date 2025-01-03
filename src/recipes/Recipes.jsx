import React, { useEffect, useState } from 'react';
import './Recipes.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedRecipe, setExpandedRecipe] = useState(null); // State for the expanded recipe
  const [selectedCategory, setSelectedCategory] = useState('All'); // State for selected category
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/recipes`); // Adjust the endpoint as needed
        setRecipes(response.data);
      } catch (err) {
        setError('Error fetching recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Function to handle expanding a recipe
  const handleExpandRecipe = (obj) => {
    const recipeId = obj._id
    navigate(`/recipes/${recipeId}`); // Navigate to SingleRecipe route with recipeId
  };

  // Filter recipes based on selected category
  const filteredRecipes = selectedCategory === 'All'
    ? recipes
    : recipes.filter(recipe => recipe.category === selectedCategory);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="Recipes-page">
      <div className="shape shape1-top-left"></div>
      <div className="shape shape1-top-right"></div>
      <h1 className="recipes-title font-serif">Recipes From Our Products</h1> {/* Title moved outside the container */}
      <div className="recipes-container">
        {/* Category Selection */}
        <div className="category-filter">
          <button onClick={() => setSelectedCategory('All')}>
            <span className="material-icons">grid_view</span> All📊
          </button>
          <button onClick={() => setSelectedCategory('Main course')}>
            <span className="material-icons">restaurant_menu</span> Main Course🍽️
          </button>
          <button onClick={() => setSelectedCategory('Desserts')}>
            <span className="material-icons">icecream</span> Desserts🍨
          </button>
          <button onClick={() => setSelectedCategory('Smoothies')}>
            <span className="material-icons">local_drink</span> Smoothies🥤
          </button>
          <button onClick={() => setSelectedCategory('Salads')}>
            <span className="material-icons">eco</span> Salads🥗
          </button>
          <button onClick={() => setSelectedCategory('Cakes')}>
            <span className="material-icons">cake</span> Cakes🍰
          </button>
          <button onClick={() => setSelectedCategory('Cookies')}>
            <span className="material-icons">cookie</span> Cookies🍪
          </button>
        </div>

        <div className="recipes-grid">
          {filteredRecipes.map((recipe) => (
            <div
              className="recipe-card"
              key={recipe._id}
              onClick={() => handleExpandRecipe(recipe)}
            >
              {recipe.imageUrl && (
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="recipe-image"
                />
              )}
              <h2 className="recipe-title">{recipe.title}</h2>
              <p className="recipe-description">
                {recipe.description.length > 100
                  ? `${recipe.description.slice(0, 100)}...`
                  : recipe.description}
              </p>
              <h3>Ingredients:</h3>
              <ul className="ingredients-list">
                {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                  <li key={index}>{ingredient}</li> // Custom bullet added in CSS
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Detailed view for the expanded recipe */}
        {expandedRecipe && (
          <div className="recipe-detail-view">
            <h2 className="detail-title">{expandedRecipe.title}</h2>
            {expandedRecipe.imageUrl && (
              <img
                src={expandedRecipe.imageUrl}
                alt={expandedRecipe.title}
                className="detail-image"
              />
            )}
            <h3>Description:</h3>
            <p>{expandedRecipe.description}</p>
            <h3>Ingredients:</h3>
            <ul className="ingredients-list">
              {expandedRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li> // Custom bullet added in CSS
              ))}
            </ul>
            <h3>Steps:</h3>
            <ul className="steps-list"> {/* Changed from <ol> to <ul> */}
              {expandedRecipe.steps.map((step, index) => (
                <li key={index}>{step}</li> // Removed step numbering
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
