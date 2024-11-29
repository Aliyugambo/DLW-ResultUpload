// uploadRoutes.js
const express = require('express');
const multer = require('multer');
const { uploadFiles, getAllUploads,editUploads,deleteUploads } = require('../controllers/uploadController');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Route for uploading general and proficiency documents
router.post('/upload', upload.fields([
  { name: 'generalResult', maxCount: 1 },
  { name: 'proficiencyDocument', maxCount: 1 },
  { name: 'proficiencySecondTerm', maxCount: 1 },
]), uploadFiles);

// Route for fetching all uploaded files
router.get('/upload', getAllUploads);

router.put('/uploads/:id', editUploads);

// Delete upload document
router.delete('/uploads/:id', deleteUploads);

module.exports = router;
