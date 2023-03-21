const express = require("express");
const router = express.Router();
const popularBooksController = require("../controllers/popularBooksController");

router.get("/popular", popularBooksController.getPopularBooks);

module.exports = router;
