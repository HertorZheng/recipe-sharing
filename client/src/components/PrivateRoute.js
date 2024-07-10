import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  console.log('PrivateRoute - isLoggedIn:', isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
