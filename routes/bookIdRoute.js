const express = require("express");
const router = express.Router();
const bookIdController = require("../controllers/bookIdController");

// get book by Id
router.get("/get_book_by_id/:id", bookIdController.getBookById);

module.exports = router;
