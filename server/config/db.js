const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
    return true; // ✅ This tells server.js that it worked
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    return false; // ❌ Connection failed
  }
};

module.exports = connectDB;