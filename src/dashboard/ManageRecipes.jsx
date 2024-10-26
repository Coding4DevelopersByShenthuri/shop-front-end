import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircleIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

function ManageRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    category: '',  // New field for category
    ingredients: [],
    steps: [],
    imageUrl: ''
  });
  const [ingredientInput, setIngredientInput] = useState('');
  const [stepInput, setStepInput] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const recipeData = { ...formValues };
      if (currentRecipe) {
        const response = await axios.put(`http://localhost:3000/recipes/${currentRecipe._id}`, recipeData);
        setRecipes(recipes.map(recipe => (recipe._id === currentRecipe._id ? response.data : recipe)));
      } else {
        const response = await axios.post('http://localhost:3000/recipes', recipeData);
        setRecipes([...recipes, response.data]);
      }
      resetForm();
      alert(currentRecipe ? 'Recipe updated successfully!' : 'Recipe added successfully!');
    } catch (error) {
      console.error('Failed to save recipe:', error);
    }
  };

  const handleDelete = async (recipeId) => {
    const confirmed = window.confirm('Are you sure you want to delete this recipe?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3000/recipes/${recipeId}`);
        setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
        alert('Recipe deleted successfully!');
      } catch (error) {
        console.error('Failed to delete recipe:', error);
      }
    }
  };

  const handleEdit = (recipe) => {
    setCurrentRecipe(recipe);
    setFormValues({
      title: recipe.title,
      description: recipe.description,
      category: recipe.category,  // Set existing category for editing
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      imageUrl: recipe.imageUrl
    });
  };

  const resetForm = () => {
    setCurrentRecipe(null);
    setFormValues({
      title: '',
      description: '',
      category: '',
      ingredients: [],
      steps: [],
      imageUrl: ''
    });
    setIngredientInput('');
    setStepInput('');
  };

  const addIngredient = (e) => {
    e.preventDefault();
    if (ingredientInput.trim()) {
      setFormValues(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredientInput]
      }));
      setIngredientInput('');
    }
  };

  const addStep = (e) => {
    e.preventDefault();
    if (stepInput.trim()) {
      setFormValues(prev => ({
        ...prev,
        steps: [...prev.steps, stepInput]
      }));
      setStepInput('');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Recipes</h1>

      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded">
        <h2 className="text-lg font-medium mb-2">{currentRecipe ? 'Edit Recipe' : 'Add New Recipe'}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Title"
            value={formValues.title}
            onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={formValues.description}
            onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
            className="border p-2 rounded"
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
              placeholder="Add Ingredient"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              className="border p-2 rounded flex-grow"
            />
            <button onClick={addIngredient} className="ml-2 p-2 bg-blue-500 text-white rounded">
              Add
            </button>
          </div>
          <ul className="list-disc ml-4">
            {formValues.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <div className="flex">
            <input
              type="text"
              placeholder="Add Step"
              value={stepInput}
              onChange={(e) => setStepInput(e.target.value)}
              className="border p-2 rounded flex-grow"
            />
            <button onClick={addStep} className="ml-2 p-2 bg-blue-500 text-white rounded">
              Add
            </button>
          </div>
          <ul className="list-decimal ml-4">
            {formValues.steps.map((step, index) => (
              <li key={index}>{step}</li>
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
          <span>{currentRecipe ? 'Update Recipe' : 'Add Recipe'}</span>
        </button>
      </form>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="border rounded-lg p-4 shadow-sm">
            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-32 object-cover rounded mb-4" />
            <h3 className="text-lg font-semibold mb-1">{recipe.title}</h3>
            <p className="text-gray-700 mb-2">{recipe.description}</p>
            <p className="text-gray-600 mb-2"><strong>Category:</strong> {recipe.category}</p> {/* Display category */}
            <div className="flex justify-between">
              <button onClick={() => handleEdit(recipe)} className="text-blue-500 hover:text-blue-700 flex items-center space-x-1">
                <EyeIcon className="h-5 w-5" />
                <span>Edit</span>
              </button>
              <button 
                onClick={() => handleDelete(recipe._id)} 
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

export default ManageRecipes;
