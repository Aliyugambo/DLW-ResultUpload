const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const Admin = require('../models/Admin');
require('dotenv').config();

// Login endpoint for the admin
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log('Admin not found');
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Use the comparePassword method from the model
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      console.log('Password does not match');
      console.log('Attempted password:', password);
      console.log('Stored hashed password:', admin.password);
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token, role: admin.role });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Register a new user (admin only)
exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  const admin = req.user;

  if (admin.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden access' });
  }

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new Admin({
      username,
      password: hashedPassword,
      role
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};