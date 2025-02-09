import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api'; // Ensure this function sends a request to register a new user
import './RegisterUser.css'; // Create a CSS file for styling if needed

function RegisterUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await registerUser({ username, password, role }, token);
      setSuccess('User registered successfully');
      setError('');
      // Optionally, navigate to another page or reset the form
      setUsername('');
      setPassword('');
      setRole('user');
    } catch (err) {
      setError('Error registering user');
      setSuccess('');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register New User</h2>
        {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
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
          <div className="input-group">
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;