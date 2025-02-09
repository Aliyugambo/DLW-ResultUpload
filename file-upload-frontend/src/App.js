import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Login from './components/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    // Update isAuthenticated when token changes
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Route: Login */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />

        {/* Protected Routes */}
        <Route 
          path="/dashboard/*" 
          element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/" />} 
        />
        <Route 
          path="/register" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;