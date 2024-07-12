import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({ title: '', description: '', imageUrl: '' });

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

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`REACT_APP_API_URL/recipes/${id}`, recipe);
      navigate('/recipes');
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      border: '2px solid #ddd',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2em', color: 'black', marginBottom: '20px' }}>Edit Recipe</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label style={{ fontSize: '1.1em', color: '#333', marginBottom: '10px' }}>
          Title:
          <input type="text" name="title" value={recipe.title} onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '2px solid #ddd', borderRadius: '5px', fontSize: '1em', color: '#333' }} />
        </label>
        <label style={{ fontSize: '1.1em', color: '#333', marginBottom: '10px' }}>
          Description:
          <textarea name="description" value={recipe.description} onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '2px solid #ddd', borderRadius: '5px', fontSize: '1em', color: '#333', resize: 'vertical', height: '150px' }}></textarea>
        </label>
        <label style={{ fontSize: '1.1em', color: '#333', marginBottom: '10px' }}>
          Image URL:
          <input type="text" name="imageUrl" value={recipe.imageUrl} onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '2px solid #ddd', borderRadius: '5px', fontSize: '1em', color: '#333' }} />
        </label>
        <button type="submit" style={{ backgroundColor: '#4a90e2', color: 'white', padding: '15px 20px', marginTop: '20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1em', transition: 'background-color 0.3s ease' }}>Save</button>
      </form>
    </div>
  );
}

export default EditRecipe;

