const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/task-managers", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
} 

module.exports = connectDB
