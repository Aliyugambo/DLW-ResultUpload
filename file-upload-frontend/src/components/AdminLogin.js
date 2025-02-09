import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/api';
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
      localStorage.setItem('admin', username);
      localStorage.setItem('role', response.role); // Store the role in localStorage
      navigate('/dashboard'); // Ensure this route exists
      alert('Admin Successfully Logged In');
      console.log('Navigating to dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="dashboard-header">
          <div className='logo-container'>
          <img src={logo} alt="Company Logo" className="dashboard-logo" />
          <h2><span>D</span>L<span>W</span></h2>
          </div>
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