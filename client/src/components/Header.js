import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Header() {
  const { isLoggedIn } = useAuth();

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {!isLoggedIn ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/logout">Logout</Link></li>
              <li><Link to="/submit-recipe">Submit Recipe</Link></li>
              <li><Link to="/recipes">Recipes</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

