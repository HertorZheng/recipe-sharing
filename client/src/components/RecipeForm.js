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
      await axios.post(`${process.env.REACT_APP_API_URL}/recipes`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Recipe submitted successfully!');
      setTitle('');
      setDescription('');
      setImage(null);
    } catch (error) {
      setMessage('Error submitting recipe');
      console.error('Error submitting recipe:', error);
    }
  };




  return (
    <div className="form-border">
      <form onSubmit={handleSubmit}>
        <h2>Submit a Recipe</h2>
        {message && <p>{message}</p>}
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="10" cols="50" required />
        <label>Image:</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RecipeForm;
