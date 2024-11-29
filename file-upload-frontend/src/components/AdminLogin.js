import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/api'; // Ensure this function returns a token on success
import './Login.css';
import logo from '../assets/logo.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminLogin({ username, password });
      console.log('Token received:', response.token);
      localStorage.setItem('token', response.token);
      localStorage.setItem('admin', username)
      navigate('dashboard');
      alert('Admin Succesfully Login');
      console.log('Navigating to dashboard'); // Redirect to dashboard after login
    } catch (err) {
      setError('Invalid credentials');
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
      <div className="dashboard-header">
            <img src={logo} alt="Company Logo" className="dashboard-logo" />
          </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
