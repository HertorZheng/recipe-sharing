import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Recipe Sharing Website</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          <li><Link to="/submit-recipe">Submit Recipe</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
