import React from 'react';

function RecipeDetail({ title, description, imageUrl }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      {imageUrl && <img src={imageUrl} alt={title} />}
    </div>
  );
}

export default RecipeDetail;
