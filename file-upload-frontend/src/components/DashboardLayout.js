import React, { useEffect, useState }  from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import AppBar from './AppBar';
import AddStudent from './AddStudent';
import StudentList from './StudentList';
import SearchStudent from './SearchStudent';
import UploadDocuments from './UploadDocuments';
import UploadsList from './UploadsList';
import './DashboardLayout.css';
import logo from '../assets/logo.png';
import DashboardHome from './DashboardHome';

function DashboardLayout() {

  const adminName = localStorage.getItem('admin');
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <AppBar adminName={adminName}/>
        <div className="content">
        <div className="dashboard-header">
            <img src={logo} alt="Company Logo" className="dashboard-logo" />
          </div>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="add-student" element={<AddStudent />} />
            <Route path="students" element={<StudentList />} />
            <Route path="search" element={<SearchStudent />} />
            <Route path="upload" element={<UploadDocuments />} />
            <Route path="uploadlist" element={<UploadsList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
