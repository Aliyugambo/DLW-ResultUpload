import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Assuming token is stored upon login

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
