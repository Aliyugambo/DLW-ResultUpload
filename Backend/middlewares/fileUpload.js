const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Check file type
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|xlsx|xlsm|xlsb|xltx|png|jpg|jpeg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    cb(null, true);
  } else {
    cb('Error: Files of the allowed types only!');
  }
};

// Initialize multer with storage and file type filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 90000000000 },  // 1MB limit
  fileFilter: fileFilter
});

module.exports = upload;