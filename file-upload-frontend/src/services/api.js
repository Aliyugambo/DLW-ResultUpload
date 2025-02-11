import axios from 'axios';

const BASE_URL = 'https://dlw-resultupload.onrender.com/api';
// const BASE_URL = 'http://localhost:5000/api';

// Function to retrieve token from localStorage and set Authorization header
const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
// const authHeader = (token) => ({
//   headers: { Authorization: `Bearer ${token}` },
// });

// Admin login endpoint
export const adminLogin = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error during admin login:', error);
    throw error;
  }
};

// Register a new user (admin only)
export const registerUser = async (userData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData, authHeader(token));
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Add a new student
export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/students`, studentData, authHeader());
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

// Fetch all students with optional filters
export const fetchAllStudents = async (filters) => {
  try {
    const response = await axios.get(`${BASE_URL}/students`, { ...authHeader(), params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

// Search for a student by name or service number
export const searchStudent = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/students/search`, {
      ...authHeader(),
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error('Error searching student:', error);
    throw error;
  }
};



// Upload a general result or proficiency document
export const uploadFile = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/upload`, formData, authHeader());
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Fetch all uploaded general and proficiency documents
export const fetchAllUploads = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/upload`, authHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching uploads:', error);
    throw error;
  }
};


export const deleteUploads = async(uploadId) =>{
    try {
     const response= await axios.delete(`${BASE_URL}/uploads/${uploadId}`,authHeader());
     return response.data;
    } catch (error) {
      console.error('Error deleting Documents:', error);
    throw error;
    }
};

export const editUploads = async(uploadId, updatedData) =>{
  try {
    const response= await axios.put(`${BASE_URL}/uploads/${uploadId}`,updatedData, authHeader());
    return response.data;
   } catch (error) {
     console.error('Error editing Documents:', error);
   throw error;
   }
};


// Download a file by file path
// api.js
export const downloadFile = (filePath) => {
  const fileUrl = `http://localhost:5000/uploads/${filePath}`;
  const fileName = filePath.split('/').pop();

  const link = document.createElement('a');
  link.href = fileUrl;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const fetchStudentCountByCourse = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/students/coursecount`,authHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching student count per course:', error);
    throw error;
  }
};

// Delete a student
export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/students/${id}`, authHeader());
    return response.data;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

// Edit a student
export const editStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${BASE_URL}/students/${id}`, studentData, authHeader());
    return response.data;
  } catch (error) {
    console.error('Error editing student:', error);
    throw error;
  }
};


