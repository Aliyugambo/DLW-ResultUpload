// seedAdmin.js (run this file once to create the admin)
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');
require('dotenv').config();


const createAdmin = async () => {
  const adminExists = await Admin.findOne({ username: 'admin' });
  if (!adminExists) {
    const admin = new Admin({ username: 'admin', password: 'admin123' });
    await admin.save();
    console.log('Admin created with username: admin and password: admin123');
  } else {
    console.log('Admin already exists');
  }
  mongoose.connection.close();
};

connectDB();
