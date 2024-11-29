// studentRoutes.js
const express = require('express');
const multer = require('multer');
const { createStudent, getAllStudents, searchStudent, filterStudents, downloadFile,studentcount } = require('../controllers/studentController');

const router = express.Router();
const upload = require('../middlewares/fileUpload');

// Route for creating a new student with files
router.post('/students', upload.fields([
  { name: 'endOfTermResult', maxCount: 1 },
  {name: 'endofTermReport', maxCount: 1},
  { name: 'servicePaper', maxCount: 1 },
  { name: 'certificate', maxCount: 1 }
]), createStudent);

// Route for getting all students
router.get('/students', getAllStudents);

// Route for searching a student by name or service number
router.get('/students/search', searchStudent);

// Route for filtering students by course and year
router.get('/students/filter', filterStudents);

// Route for downloading uploaded files
// router.get('/uploads/:filename', downloadFile);
router.get('/download/:storedName/:originalName', downloadFile);

router.get('/students/coursecount', studentcount);

module.exports = router;
