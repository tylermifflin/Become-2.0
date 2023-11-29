const mongoose = require('mongoose');

// MongoDB Atlas connection string
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/become");

module.exports = mongoose.connection;
