import React from 'react';
import './Recipes.css';

const recipes = [
    {
        title: 'Fresh Vegetable Salad',
        description: 'A refreshing salad made with fresh vegetables from our produce section.',
        ingredients: [
            'Lettuce',
            'Tomatoes',
            'Cucumbers',
            'Olive Oil',
            'Lemon Juice',
            'Salt',
            'Pepper'
        ],
        image: 'https://cdn.jwplayer.com/v2/media/wGEqBtuf/thumbnails/qSXwlEH3.jpg',
        videoLink: 'https://youtu.be/o_Az-1FsK4E?si=9QaQIrc8DaDu2q7A' // Replace with actual YouTube link
    },
    {
        title: 'Spaghetti Bolognese',
        description: 'A classic Italian pasta dish with a rich meat sauce.',
        ingredients: [
            'Spaghetti',
            'Ground Beef',
            'Onion',
            'Garlic',
            'Tomato Sauce',
            'Parmesan Cheese',
            'Basil'
        ],
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu2FEm-L43OU36h8exife2sBQa3GAHADfnYg&s',
        videoLink: 'https://youtu.be/v2WqcHH65NQ?si=Hwh8UsiEukdMK58J' // Replace with actual YouTube link
    },
    {
        title: 'Chocolate Chip Cookies',
        description: 'Delicious cookies loaded with chocolate chips.',
        ingredients: [
            'Flour',
            'Sugar',
            'Butter',
            'Chocolate Chips',
            'Eggs',
            'Vanilla Extract',
            'Baking Soda'
        ],
        image: 'https://thedinnerbell.recipes/wp-content/uploads/2024/07/Double-Chocolate-Chip-Cookies-Soft-Double-Chocolate-Chip-Cookies-33663.jpg',
        videoLink: 'https://youtu.be/hqd8i8eXDsQ?si=pg4sdMxvKWPMOkqI' // Replace with actual YouTube link
    },
    {
        title: 'Grilled Chicken Tacos',
        description: 'Tasty tacos filled with grilled chicken and fresh toppings.',
        ingredients: [
            'Grilled Chicken',
            'Corn Tortillas',
            'Avocado',
            'Salsa',
            'Cilantro',
            'Lime Juice'
        ],
        image: 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FEdit%2F2022-08-Grilled-Chicken-Tacos%2FGrilled_Chicken_Tacos-3',
        videoLink: 'https://youtu.be/xXhOEKAPi0U?si=d6Ek6Pr0arCrv_H6' // Replace with actual YouTube link
    },
    {
        title: 'Vegetable Stir Fry',
        description: 'A colorful stir fry with a mix of fresh vegetables.',
        ingredients: [
            'Bell Peppers',
            'Broccoli',
            'Carrots',
            'Soy Sauce',
            'Ginger',
            'Garlic',
            'Sesame Oil'
        ],
        image: 'https://kristineskitchenblog.com/wp-content/uploads/2024/01/vegetable-stir-fry-22-3.jpg',
        videoLink: 'https://youtu.be/Ak5GEd2z1FI?si=sVsmla9Xzl9cp8uh' // Replace with actual YouTube link
    },
    {
        title: 'Beef Tacos',
        description: 'Spicy beef tacos with cheese and salsa.',
        ingredients: [
            'Ground Beef',
            'Taco Shells',
            'Lettuce',
            'Cheddar Cheese',
            'Sour Cream',
            'Salsa'
        ],
        image: 'https://loveandgoodstuff.com/wp-content/uploads/2020/08/classic-ground-beef-tacos-1200x1200.jpg',
        videoLink: 'https://youtu.be/qL6ml7x56p4?si=GW4Bn7CbMv_oze3k' // Replace with actual YouTube link
    },
    {
        title: 'Strawberry Smoothie',
        description: 'A refreshing smoothie made with fresh fruits.',
        ingredients: [
            'Banana',
            'Strawberries',
            'Yogurt',
            'Honey',
            'Milk',
            'Ice Cubes'
        ],
        image: 'https://www.thespruceeats.com/thmb/DTkCRqNWiK8HmlAANacYhMLhN9E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/strawberry-breakfast-smoothie-recipe-2097149-hero-02-5c1d4b2a46e0fb00014bf2ec.jpg',
        videoLink: 'https://youtu.be/RrP7LqALuug?si=H5KIsgFhieid9Gh2' // Replace with actual YouTube link
    },
    {
        title: 'Caprese Salad',
        description: 'A classic Italian salad with fresh mozzarella and tomatoes.',
        ingredients: [
            'Mozzarella Cheese',
            'Tomatoes',
            'Basil',
            'Olive Oil',
            'Balsamic Vinegar',
            'Salt'
        ],
        image: 'https://whatsgabycooking.com/wp-content/uploads/2023/06/Dinner-Party-__-Traditional-Caprese-1-1200x800-1.jpg',
        videoLink: 'https://youtu.be/gOcfUgd4ekA?si=nq75lnSGEWLsWG16' // Replace with actual YouTube link
    },
    {
        title: 'Chicken Alfredo',
        description: 'Creamy fettuccine pasta with grilled chicken in an Alfredo sauce.',
        ingredients: [
            'Fettuccine',
            'Grilled Chicken',
            'Heavy Cream',
            'Parmesan Cheese',
            'Garlic',
            'Butter',
            'Parsley'
        ],
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9GKf3CAv4p-R3JDJ_QjN9lLFnSejCimm0ow&s',
        videoLink: 'https://youtu.be/LPPcNPdq_j4?si=SfviU_cTxpFRu-Ee' // Replace with actual YouTube link
    },
    {
        title: 'Pancakes',
        description: 'Fluffy pancakes served with maple syrup and butter.',
        ingredients: [
            'Flour',
            'Milk',
            'Eggs',
            'Sugar',
            'Baking Powder',
            'Butter',
            'Maple Syrup'
        ],
        image: 'https://www.wholesomeyum.com/wp-content/uploads/2017/03/wholesomeyum-Low-Carb-Keto-Pancakes-Recipe-21-500x500.jpg',
        videoLink: 'https://youtu.be/9zCVCL4V8JQ?si=IRYAVUi1iOnoRplo' // Replace with actual YouTube link
    },
    {
        title: 'Mushroom Risotto',
        description: 'Creamy risotto with sautéed mushrooms and parmesan cheese.',
        ingredients: [
            'Arborio Rice',
            'Mushrooms',
            'Vegetable Broth',
            'Onion',
            'Garlic',
            'Parmesan Cheese',
            'Olive Oil'
        ],
        image: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/01/mushroom-risotto.jpg',
        videoLink: 'https://youtu.be/ju9H1RlYNxk?si=UIbBUU_MKff2cQ_f' // Replace with actual YouTube link
    },
    {
        title: 'Shrimp Scampi',
        description: 'Succulent shrimp sautéed in garlic, butter, and white wine sauce.',
        ingredients: [
            'Shrimp',
            'Garlic',
            'Butter',
            'White Wine',
            'Parsley',
            'Lemon Juice',
            'Pasta'
        ],
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA1IW0VEBreR8K1Vo__-zvvC5xqAvcU6_XXQ&s',
        videoLink: 'https://youtu.be/VZFSIs_37UA?si=lctGxHyPmtY1ZSAO' // Replace with actual YouTube link
    },
];

const Recipes = () => {
    return (
        <div className="recipes-container">
            <h1>Recipes From Our Products</h1>
            <div className="recipes-list">
                {recipes.map((recipe, index) => (
                    <div className="recipe-card" key={index}>
                        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>
                        <h3>Ingredients:</h3>
                        <ul>
                            {recipe.ingredients.map((ingredient, idx) => (
                                <li key={idx}>{ingredient}</li>
                            ))}
                        </ul>
                        <a href={recipe.videoLink} target="_blank" rel="noopener noreferrer" className="read-more-button">
                            Read More
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recipes;
