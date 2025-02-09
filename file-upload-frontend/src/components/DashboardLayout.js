import React, { useEffect, useState }  from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import AppBar from './AppBar';
import AddStudent from './AddStudent';
import StudentList from './StudentList';
import SearchStudent from './SearchStudent';
import UploadDocuments from './UploadDocuments';
import UploadsList from './UploadsList';
import RegisterUser from './RegisterUser';
import './DashboardLayout.css';
import ProtectedRoute from './ProtectedRoute';
// import logo from '../assets/logo.png';
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
        <h2><span>D</span>L<span>W</span></h2>
          </div>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="register" element={
              <ProtectedRoute>
                <RegisterUser />
              </ProtectedRoute>
            } />
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
