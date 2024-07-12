import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetail.css';

function RecipeDetail() {
  const { id } = useParams(); // Ensure id is retrieved from useParams
  const navigate = useNavigate(); // Ensure navigate is defined
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`REACT_APP_API_URL/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit-recipe/${id}`); // Ensure id is passed to the navigate function
  };


  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      {recipe.imageUrl && <img src={`http://localhost:5000/${recipe.imageUrl}`} alt={recipe.title} className="recipe-image" />}
      <p>{recipe.description}</p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}

export default RecipeDetail;

