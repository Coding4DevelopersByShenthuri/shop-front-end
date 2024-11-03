import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLoaderData, useParams } from 'react-router-dom';

const SingleRecipe = () => {
  const recipe = useLoaderData();
  const { recipeId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!recipe) return <div>No recipe found.</div>;

  return (
    <div className="SingleRecipe bg-teal-100">
      <h2 className="recipe-title">{recipe.title}</h2>
      {recipe.imageUrl && (
        <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
      )}
      <h3>Description:</h3>
      <p>{recipe.description}</p>
      <h3>Ingredients:</h3>
      <ul className="ingredients-list">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Steps:</h3>
      <ul className="steps-list">
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
};

export default SingleRecipe;
