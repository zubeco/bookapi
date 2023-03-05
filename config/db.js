const mongoose = require("mongoose");
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the Node.js process with an error code
  }
}

module.exports = {
  connectToDatabase,
  connection: mongoose.connection,
};
