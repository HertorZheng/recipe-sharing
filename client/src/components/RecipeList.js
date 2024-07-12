import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RecipeList.css';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('${process.env.REACT_APP_API_URL}/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/recipes/${id}`);
      setRecipes(recipes.filter(recipe => recipe._id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="recipe-list">
      <h1>All Recipes</h1>
      <h4>Click the image to edit the recipe details</h4>
      <div className="recipes-container">
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map(recipe => (
            <div key={recipe._id} className="recipe-card">
              <Link to={`/recipe/${recipe._id}`} className="recipe-link">
                <h2>{recipe.title}</h2>
                {recipe.imageUrl && <img src={`process.env.REACT_APP_IMAGE_URL/${recipe.imageUrl}`} alt={recipe.title} className="recipe-image" />}
                <p className="recipe-description">{recipe.description}</p>
              </Link>
              <button onClick={() => handleDelete(recipe._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecipeList;
