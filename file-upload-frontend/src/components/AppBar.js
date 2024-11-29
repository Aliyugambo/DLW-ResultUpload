import React from 'react';
import './AppBar.css';

const AppBar = ({ adminName }) => {
  return (
    <div className="app-bar">
      <h2>Welcome back, {adminName}</h2>
      <button onClick={() => { localStorage.clear(); window.location.href = '/'; }}>Logout</button>
    </div>
  );
};

export default AppBar;
