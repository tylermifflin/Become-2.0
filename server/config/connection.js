const mongoose = require('mongoose');

// MongoDB Atlas connection string
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Become-2.0");

module.exports = mongoose.connection;
