import React, { useState } from 'react';
import axios from 'axios';

function RecipeForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await axios.post('/api/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Recipe submitted successfully!');
    } catch (error) {
      setMessage('Recipe submission failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Submit a Recipe</h2>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <label>Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="10"
        cols="50"
        required
      />
      <label>Image:</label>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default RecipeForm;
