import React, { useEffect, useState } from 'react';
import './Recipes.css';
import axios from 'axios';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedRecipe, setExpandedRecipe] = useState(null); // State for the expanded recipe

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recipes'); // Adjust the endpoint as needed
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
  const handleExpandRecipe = (recipe) => {
    setExpandedRecipe((prev) => (prev && prev._id === recipe._id ? null : recipe)); // Toggle expand/collapse
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="Recipes-page"> {/* Light blue background wrapper */}
      <div className="recipes-container">
        <h1 className="recipes-title">Recipes From Our Products</h1>
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div className="recipe-card" key={recipe._id}>
              {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />}
              <h2 className="recipe-title">{recipe.title}</h2>
              <p className="recipe-description">{recipe.description}</p>
              <h3>Ingredients:</h3>
              <ul className="ingredients-list">
                {recipe.ingredients.slice(0, 3).map((ingredient, index) => ( // Show only first 3 ingredients initially
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>

              {/* Read More button */}
              <button className="read-more-button" onClick={() => handleExpandRecipe(recipe)}>
                {expandedRecipe && expandedRecipe._id === recipe._id ? 'Show Less' : 'Read More'}
              </button>
            </div>
          ))}
        </div>

        {/* Detailed view for the expanded recipe */}
        {expandedRecipe && (
          <div className="recipe-detail-view">
            <h2 className="detail-title">{expandedRecipe.title}</h2>
            {expandedRecipe.imageUrl && <img src={expandedRecipe.imageUrl} alt={expandedRecipe.title} className="detail-image" />}
            <h3>Description:</h3>
            <p>{expandedRecipe.description}</p>
            <h3>Ingredients:</h3>
            <ul className="ingredients-list">
              {expandedRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>Steps:</h3>
            <ol className="steps-list">
              {expandedRecipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
