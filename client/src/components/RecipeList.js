import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RecipeList.css';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/recipes`);
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="recipe-list">
      <h1>All Recipes</h1>
      <h4>Click the image to view the recipe details</h4>
      <div className="recipes-container">
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map(recipe => (
            <div key={recipe._id} className="recipe-card">
              <Link to={`/recipe/${recipe._id}`} className="recipe-link">
                <h2>{recipe.title}</h2>
                {recipe.imageUrl && <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${recipe.imageUrl}`} alt={recipe.title} className="recipe-image" />}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecipeList;
