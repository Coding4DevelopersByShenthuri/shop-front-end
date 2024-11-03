import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLoaderData, useParams } from 'react-router-dom';
import './SingleRecipe.css';

const SingleRecipe = () => {
  const recipe = useLoaderData();
  const { recipeId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!recipe) return <div>No recipe found.</div>;

  return (
    <div className="page-container">
      <div className='w-full max-w-[1200px] mx-auto px-4 lg:px-24 mt-16'>
      <h2 className="recipe-title text-2xl font-bold">{recipe.title}</h2>
      {recipe.imageUrl && (
        <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image w-full h-auto rounded mt-2" />
      )}
      <h3 className="mt-4 text-xl font-semibold">Description:</h3>
      <p className="mb-4">{recipe.description}</p>
      <h3 className="text-xl font-semibold">Ingredients:</h3>
      <ul className="ingredients-list list-disc pl-5 mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold">Steps:</h3>
      <ul className="steps-list list-decimal pl-5">
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default SingleRecipe;