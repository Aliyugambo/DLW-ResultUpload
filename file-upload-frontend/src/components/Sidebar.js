import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserPlus, faList, faFileUpload, faFolder } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import logo from '../assets/logo.png';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Company Logo" className="logo-image" />
      </div>
      <NavLink to="/dashboard" className="sidebar-link" activeClassName="active">
        <FontAwesomeIcon icon={faTachometerAlt} className="icon" />Home
      </NavLink>
      <NavLink to="/dashboard/upload" className="sidebar-link" activeClassName="active">
        <FontAwesomeIcon icon={faFileUpload} className="icon" /> Documents-Upload
      </NavLink>
      <NavLink to="/dashboard/uploadlist" className="sidebar-link" activeClassName="active">
        <FontAwesomeIcon icon={faFolder} className="icon" /> Course-Docs
      </NavLink>
      <NavLink to="/dashboard/add-student" className="sidebar-link" activeClassName="active">
        <FontAwesomeIcon icon={faUserPlus} className="icon" /> Student
      </NavLink>
      <NavLink to="/dashboard/students" className="sidebar-link" activeClassName="active">
        <FontAwesomeIcon icon={faList} className="icon" /> All-Student
      </NavLink>
      <NavLink to="/dashboard/register" className="sidebar-link" activeClassName="active">
        <FontAwesomeIcon icon={faUserPlus} className="icon" />Register-Users
      </NavLink>
    </div>
  );
}

export default Sidebar;