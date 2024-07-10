import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { useAuth } from './AuthContext';
=======
>>>>>>> 460bbe19ae0977078a205066e86c4c0f9c696e5b

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
<<<<<<< HEAD
  const { login } = useAuth();
=======
>>>>>>> 460bbe19ae0977078a205066e86c4c0f9c696e5b

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
<<<<<<< HEAD
      login(response.data.token);
=======
      localStorage.setItem('token', response.data.token);
>>>>>>> 460bbe19ae0977078a205066e86c4c0f9c696e5b
      navigate('/recipes');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
<<<<<<< HEAD
    <div class="form-border">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
=======
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
>>>>>>> 460bbe19ae0977078a205066e86c4c0f9c696e5b
  );
}

export default Login;
