const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Admin = require('./models/Admin');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // First, clear any existing admin
    await Admin.deleteOne({ username: 'admin' });

    const username = 'admin';
    const password = 'adminpassword';
    const role = 'admin';

    const hashedPassword = await bcryptjs.hash(password, 10);

    const admin = new Admin({
      username,
      password: hashedPassword,
      role,
    });

    await admin.save();
    console.log('Admin user seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding admin user:', error);
    mongoose.connection.close();
  }
};

seedAdmin();