import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    console.log('API URL:', process.env.REACT_APP_API_URL); // Add this line to log the API URL

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, { email, password });
      console.log(response.data);  // Add this line to log the response for debugging
      if (response.status === 201) {
        navigate('/login');
      } else {
        setError('Error registering user');
      }
    } catch (err) {
      console.error('Signup error:', err);
      console.error('Error details:', err.response); // Log error details
      setError('Error registering user');
    }
  };

  return (
    <div className="signup">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;