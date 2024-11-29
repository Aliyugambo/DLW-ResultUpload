const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Login endpoint for the admin
exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Unauthorized access' });
    }
};
