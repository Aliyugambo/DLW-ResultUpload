// backend/app.js
const express = require('express');
const studentRoutes = require('./routes/studentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const path = require('path');
const connectDB = require('./config/db');
const cors = require('cors');
const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/admin');
const app = express();

app.use(cors());
// Database Connection
connectDB();

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api', authMiddleware,studentRoutes);
app.use('/api', authMiddleware, uploadRoutes);

module.exports = app;
