import React from 'react';
import './Recipes.css';

const recipes = [
  {
    id: 1,
    title: 'Spaghetti Bolognese',
    description: 'A classic Italian pasta dish with rich, meaty sauce.',
    imageUrl: 'https://example.com/spaghetti-bolognese.jpg',
    category: 'Italian',
  },
  {
    id: 2,
    title: 'Chicken Curry',
    description: 'A spicy and flavorful chicken curry dish.',
    imageUrl: 'https://example.com/chicken-curry.jpg',
    category: 'Indian',
  },
  {
    id: 3,
    title: 'Vegetarian Stir-fry',
    description: 'A quick and healthy stir-fry with fresh vegetables.',
    imageUrl: 'https://example.com/vegetarian-stirfry.jpg',
    category: 'Asian',
  },
  {
    id: 4,
    title: 'Margherita Pizza',
    description: 'An Italian pizza with tomatoes, mozzarella, and basil.',
    imageUrl: 'https://example.com/margherita-pizza.jpg',
    category: 'Italian',
  },
  {
    id: 5,
    title: 'Beef Tacos',
    description: 'A Mexican dish with seasoned beef and fresh toppings.',
    imageUrl: 'https://example.com/beef-tacos.jpg',
    category: 'Mexican',
  },
  {
    id: 6,
    title: 'Sushi Rolls',
    description: 'Traditional Japanese sushi with fresh fish and rice.',
    imageUrl: 'https://example.com/sushi-rolls.jpg',
    category: 'Japanese',
  },
];

// Function to group recipes by category
const groupByCategory = (recipes) => {
  return recipes.reduce((groupedRecipes, recipe) => {
    const { category } = recipe;
    if (!groupedRecipes[category]) {
      groupedRecipes[category] = [];
    }
    groupedRecipes[category].push(recipe);
    return groupedRecipes;
  }, {});
};

const Recipes = () => {
  const categorizedRecipes = groupByCategory(recipes);

  return (
    <div className="recipes-container">
      {Object.keys(categorizedRecipes).map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-3xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorizedRecipes[category].map((recipe) => (
              <div
                key={recipe.id}
                className="border rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform transform hover:scale-105"
              >
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-2xl font-bold mb-2">{recipe.title}</h3>
                  <p className="text-gray-600">{recipe.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recipes;
