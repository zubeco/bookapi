const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const BookSchema = new mongoose.Schema({
  book_id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publication_date: {
    type: Date,
    required: true,
  },
  cover_image: {
    type: String,
    required: true,
  },
  reviews: {
    type: Map,
    of: String,
  },
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
