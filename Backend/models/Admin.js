const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs'); // Changed to bcryptjs for consistency

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'user'], default: 'user' }
});

// Method to compare entered password with hashed password
adminSchema.methods.comparePassword = async function(password) {
  return bcryptjs.compare(password, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);