// src/components/AddStudent.js
import React, { useState } from 'react';
import { addStudent } from '../services/api';
// import './styles.css';


function AddStudent() {
  const [name, setName] = useState('');
  const [serviceNumber, setServiceNumber] = useState('');
  const [endOfTermResult, setEndOfTermResult] = useState(null);
  const [endOfTermReport, setEndOfTermReport] = useState(null);
  const [servicePaper, setServicePaper] = useState(null);
  const [course, setCourse] = useState('');
  const [award, setAward] = useState('');
  const [position, setPosition] = useState('');
  const [certificate, setCertificate] = useState(null);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('serviceNumber', serviceNumber);
    formData.append('course', course);
    formData.append('award', award);
    formData.append('position', position);
    formData.append('certificate', certificate);
    formData.append('endOfTermResult', endOfTermResult);
    formData.append('endofTermReport', endOfTermReport);
    formData.append('servicePaper', servicePaper);

    try {
      await addStudent(formData);
      alert("Student added successfully!");
      setName('');
      setServiceNumber('');
      setCourse('');
      setAward('');
      setPosition('');
      setCertificate(null);
      setEndOfTermResult(null);
      setEndOfTermReport(null);
      setServicePaper(null);
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student.");
    }
  };

  return (
    <div >
      <h2>Add Student</h2>
      <div className='login-box'>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Service Number" value={serviceNumber} onChange={(e) => setServiceNumber(e.target.value)} required />
        <input type="text" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} required />
        <input type="text" placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} required />
        <input type="text" placeholder="Award" value={award} onChange={(e) => setAward(e.target.value)} required />

        <label>
          Certificate:
        <input
          type="file"
          onChange={(e) => handleFileChange(e, setCertificate)}
          required
        />
        </label>
        <label>
          EndOfTermResult:
        <input
          type="file"
          onChange={(e) => handleFileChange(e, setEndOfTermResult)}
          required
        />
        </label>

        <label>
          EndOfTermReport:
        <input
          type="file"
          onChange={(e) => handleFileChange(e, setEndOfTermReport)}
          required
        />
        </label>

        <label>
          ServicePaper:
        <input
          type="file"
          onChange={(e) => handleFileChange(e, setServicePaper)}
          required
        />
        </label>

        <button type="submit">Add Student</button>
      </form>
      </div>
    </div>
  );
}

export default AddStudent;
