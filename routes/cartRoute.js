const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

router.get("/cart_items/:userId/cart", cartController.getCartItems);
router.post("/cart_items/:userId/:bookId", cartController.addToCart);
router.delete("/cart_items/:userId/:itemId", cartController.removeFromCart);
module.exports = router;
