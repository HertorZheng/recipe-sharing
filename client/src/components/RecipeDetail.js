import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetail.css';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit-recipe/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/recipes/${id}`);
      navigate('/recipes');
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      {recipe.imageUrl && <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${recipe.imageUrl}`} alt={recipe.title} className="recipe-image" />}
      <p>{recipe.description}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default RecipeDetail;
