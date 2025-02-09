import React, { useState, useEffect } from 'react';
import { fetchAllUploads,deleteUploads,editUploads } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp,faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// import './UploadsList.css'; // Import CSS for additional styling

const UploadsList = () => {
  const [uploads, setUploads] = useState([]);
  const [isFirstTerm, setIsFirstTerm] = useState(true);
  const [editMode, setEditMode] = useState(null); // To track which upload is in edit mode
  const [editedData, setEditedData] = useState({}); // Store edited data


  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const data = await fetchAllUploads();
        setUploads(data);
      } catch (error) {
        console.error('Error fetching uploads:', error);
      }
    };

    fetchUploads();
  }, []);

  // Toggle function to switch between first and second term document
  const toggleDocument = () => {
    setIsFirstTerm(!isFirstTerm);
  };

  // Function to handle delete
  const handleDelete = async (uploadId) => {
    try {
      await deleteUploads(uploadId); // Call delete API
      setUploads(uploads.filter((upload) => upload._id !== uploadId));
    } catch (error) {
      console.error('Error deleting upload:', error);
    }
  };

  // Function to handle edit mode toggle
  const handleEditToggle = (upload) => {
    setEditMode(upload._id);
    setEditedData({
      courseTitle: upload.courseTitle,
      department: upload.department,
      // Add other editable fields here if necessary
    });
  };


  // Function to handle saving edited data
  const handleSave = async (uploadId) => {
    try {
      await editUploads(uploadId, editedData); // Call update API
      setUploads(uploads.map((upload) => (upload._id === uploadId ? { ...upload, ...editedData } : upload)));
      setEditMode(null); // Exit edit mode
    } catch (error) {
      console.error('Error updating upload:', error);
    }
  };

  // Function to handle input changes for edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Course Title</th>
            {/* <th>Department</th> */}
            <th>General Result</th>
            <th>Proficiency Document</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {uploads.map((upload) => (
            <tr key={upload._id}>
              <td>{new Date(upload.date).getFullYear()}</td>
              <td>
                {editMode === upload._id ? (
                  <input
                    type="text"
                    name="courseTitle"
                    value={editedData.courseTitle}
                    onChange={handleInputChange}
                  />
                ) : (
                  upload.courseTitle
                )}
              </td>
              {/* <td>
                {editMode === upload._id ? (
                  <input
                    type="text"
                    name="department"
                    value={editedData.department}
                    onChange={handleInputChange}
                  />
                ) : (
                  upload.department
                )}
              </td> */}
              <td>
                <a 
                  href={`http://localhost:5000/uploads/${upload.generalResult}`} 
                  target="_blank" 
                  rel="noopener noreferrer">
                  View General Result
                </a>
              </td>
              <td>
                <a 
                  href={`http://localhost:5000/uploads/${isFirstTerm ? upload.proficiencyDocument : upload.proficiencySecondTerm}`} 
                  target="_blank" 
                  rel="noopener noreferrer">
                  {isFirstTerm ? 'View 1 Term' : 'View 2 Term'}
                </a>
                <FontAwesomeIcon
                  icon={isFirstTerm ? faAngleDown : faAngleUp}
                  onClick={toggleDocument}
                  className="toggle-icon"
                  title="Toggle Document"
                />
              </td>
              <td>
                {editMode === upload._id ? (
                  <>
                    <button onClick={() => handleSave(upload._id)}>Save</button>
                    <button onClick={() => setEditMode(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => handleEditToggle(upload)}
                      className="action-icon"
                      title="Edit"
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      onClick={() => handleDelete(upload._id)}
                      className="action-icon delete-icon"
                      title="Delete"
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadsList;
