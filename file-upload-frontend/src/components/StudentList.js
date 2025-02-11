import React, { useState, useEffect } from 'react';
import { fetchAllStudents, searchStudent, downloadFile, deleteStudent, editStudent } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [editStudentData, setEditStudentData] = useState({});
  const studentsPerPage = 6;

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchAllStudents();
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    loadStudents();
  }, []);

  const uniqueCourses = [...new Set(students.map(student => student.course))];
  const uniqueYears = [...new Set(students.map(student => student.year))];

  const handleSearch = async () => {
    const query = {};

    if (searchTerm) {
      const isServiceNumberFormat = /^N\/\d+$/.test(searchTerm.trim());
      if (isServiceNumberFormat) {
        query.serviceNumber = searchTerm.trim();
      } else {
        query.name = searchTerm.trim();
      }
    }

    try {
      if (Object.keys(query).length > 0) {
        const results = await searchStudent(query);
        setFilteredStudents(Array.isArray(results) ? results : [results]);
      } else {
        setFilteredStudents(students);
      }
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching for students:', error);
      setFilteredStudents([]);
    }
  };

  const handleFilter = () => {
    let filtered = students;
    if (selectedCourse) filtered = filtered.filter(student => student.course === selectedCourse);
    if (selectedYear) filtered = filtered.filter(student => student.year === selectedYear);
    setFilteredStudents(filtered);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCourse('');
    setSelectedYear('');
    setFilteredStudents(students);
    setCurrentPage(1);
  };

  const handleDownload = (storedName, originalName) => {
    try {
      downloadFile(storedName, originalName);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      setFilteredStudents(filteredStudents.filter(student => student._id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleEdit = (student) => {
    setEditMode(true);
    setEditStudentData(student);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditStudentData({ ...editStudentData, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await editStudent(editStudentData._id, editStudentData);
      setEditMode(false);
      setFilteredStudents(filteredStudents.map(student => student._id === editStudentData._id ? editStudentData : student));
    } catch (error) {
      console.error('Error editing student:', error);
    }
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <div className='student-list-container'>
      <h2>Student List</h2>
      <div className='search-container'>
        <input 
          className='search-input'
          type="text" 
          placeholder="Search by Name or Service Number" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className='search-button' onClick={handleSearch}>Search</button>
        
        <select className='search-input' value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">Select Course</option>
          {uniqueCourses.map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
        
        <button onClick={handleFilter}>Filter</button>
        <button className='reset-button' onClick={handleResetFilters}>Reset Filters</button>
      </div>

      <table className='student-table'>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Service Number</th>
            <th>Course</th>
            <th>Certificate</th>
            <th>EOTR</th>
            <th>EOTRe</th>
            <th>SP</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.length > 0 ? (
            currentStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.serviceNumber}</td>
                <td>{student.course}</td>
                <td>
                  {student.certificate ? (
                    <button 
                      className='download-button' 
                      onClick={() => handleDownload(student.certificate.storedName, student.certificate.originalName)}>
                      Download
                    </button>
                  ) : 'No File'}
                </td>
                <td>
                  {student.endOfTermResult ? (
                    <button 
                      className='download-button' 
                      onClick={() => handleDownload(student.endOfTermResult.storedName, student.endOfTermResult.originalName)}>
                      Download
                    </button>
                  ) : 'No File'}
                </td>
                <td>
                  {student.endofTermReport ? (
                    <button 
                      className='download-button' 
                      onClick={() => handleDownload(student.endofTermReport.storedName, student.endofTermReport.originalName)}>
                      Download
                    </button>
                  ) : 'No File'}
                </td>
                <td>
                  {student.servicePaper ? (
                    <button 
                      className='download-button' 
                      onClick={() => handleDownload(student.servicePaper.storedName, student.servicePaper.originalName)}>
                      Download
                    </button>
                  ) : 'No File'}
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => handleEdit(student)}
                    className="action-icon"
                    title="Edit"
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    onClick={() => handleDelete(student._id)}
                    className="action-icon delete-icon"
                    title="Delete"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="8">No students found.</td></tr>
          )}
        </tbody>
      </table>

      <div className='pagination'>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastStudent >= filteredStudents.length}>
          Next
        </button>
      </div>

      {editMode && (
        <div className='edit-form-container'>
          <h2>Edit Student</h2>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              name="name"
              value={editStudentData.name}
              onChange={handleEditChange}
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="serviceNumber"
              value={editStudentData.serviceNumber}
              onChange={handleEditChange}
              placeholder="Service Number"
              required
            />
            <input
              type="text"
              name="course"
              value={editStudentData.course}
              onChange={handleEditChange}
              placeholder="Course"
              required
            />
            <input
              type="number"
              name="year"
              value={editStudentData.year}
              onChange={handleEditChange}
              placeholder="Year"
              required
            />
            <input
              type="text"
              name="award"
              value={editStudentData.award}
              onChange={handleEditChange}
              placeholder="Award"
            />
            <input
              type="text"
              name="position"
              value={editStudentData.position}
              onChange={handleEditChange}
              placeholder="Position"
            />
            <button type="submit" className='save-button'>Save</button>
            <button type="button" className='cancel-button' onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentList;