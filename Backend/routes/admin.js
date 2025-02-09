// routes/admin.js
const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', authController.adminLogin);
router.post('/register', authMiddleware, authController.registerUser); // Protect the registration endpoint

module.exports = router;