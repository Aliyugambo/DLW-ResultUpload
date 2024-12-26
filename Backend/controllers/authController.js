const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()
// Login endpoint for the admin
exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Unauthorized access' });
    }
};
