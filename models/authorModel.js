const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const authorSchema = new mongoose.Schema({
  author_id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
