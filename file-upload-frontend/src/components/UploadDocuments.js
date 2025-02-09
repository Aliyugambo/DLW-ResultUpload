import React, { useState } from 'react';
import axios from 'axios';
import { uploadFile } from '../services/api';
// import './styles.css';
const UploadComponent = () => {
  const [generalResult, setGeneralResult] = useState(null);
  const [proficiencyDocument, setProficiencyDocument] = useState(null);
  const [proficiencySecondTerm, setproficiencySecondTerm] = useState(null);
  const [date, setDate] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  // const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('');

  const handleGeneralResultChange = (e) => {
    setGeneralResult(e.target.files[0]);
  };

  const handleProficiencyDocumentChange = (e) => {
    setProficiencyDocument(e.target.files[0]);
  };
  
  const handleProficiencysecondDocumentChange = (e) => {
    setproficiencySecondTerm(e.target.files[0]);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!generalResult || !proficiencyDocument || !date || !courseTitle) {
      setMessage("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append('generalResult', generalResult);
    formData.append('proficiencyDocument', proficiencyDocument);
    formData.append('proficiencySecondTerm', proficiencySecondTerm);
    formData.append('date', date);
    formData.append('courseTitle', courseTitle);
    // formData.append('department', department);

    try {
      await uploadFile(formData);
      alert("Doccuments Uploaded Successfully!");
      setGeneralResult('');
      setProficiencyDocument('');
      setproficiencySecondTerm('')
      setDate('');
      setCourseTitle('');
      // setDepartment('');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert("Failed to Upload File");
      setMessage('Error uploading files.');

    }
  };

  return (
    <div>
        {message && <p>{message}</p>}
      <h2>Upload Files</h2>
      <div className='login-box'>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <label>
          Course Title:
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
          />
        </label>

        {/* <label>
          Department:
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </label> */}

        <label>
          General Result:
          <input type="file" onChange={handleGeneralResultChange} required />
        </label>

        <label>
          Proficiency 1 Term:
          <input type="file" onChange={handleProficiencyDocumentChange} required />
        </label>
        <label>
          Proficiency 2 Term:
          <input type="file" onChange={handleProficiencysecondDocumentChange} required />
        </label>

        <button type="submit" className="login-btn">Upload Files</button>
      </form>
      </div>
    </div>
  );
};

export default UploadComponent;
