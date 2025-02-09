import React from 'react';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Assuming you store the role in localStorage
  const username = localStorage.getItem('admin'); 

  if (!token || userRole !== 'admin') {
    // Redirect to login or home page if not authenticated or not an admin
    return (
      <div className="access-denied">
      <h2>Access Denied</h2>
      <p>{username}, you don't have access to this part of the app. Thank you.</p>
    </div>
    )
  }

  return children;
};

export default ProtectedRoute;