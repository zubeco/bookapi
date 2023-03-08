const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// search for a book
router.get("/search", bookController.searchBooks);

module.exports = router;
