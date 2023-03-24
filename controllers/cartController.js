const axios = require("axios");
const CartItem = require("../models/cartItemModel");
const User = require("../models/userModel");

exports.getCartItems = async (req, res) => {
  const { userId } = req.params;
  try {
    const cartItems = await CartItem.find({ user: userId });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  const { userId, bookId } = req.params;

  try {
    // find the user in the database using the user id
    const user = await User.findOne({ user_id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItem = await CartItem.findOne({ itemId: bookId, user: userId });

    if (cartItem) {
      cartItem.quantity += 1;
      const updatedCartItem = await cartItem.save();
      res.status(200).json(updatedCartItem);
    } else {
      const openLibraryUrl = `https://openlibrary.org/books/${bookId}.json`;
      const { data } = await axios.get(openLibraryUrl);
      const { title } = data;

      const newCartItem = new CartItem({
        itemId: bookId,
        name: title,
        quantity: 1,
        user: userId,
      });

      const savedCartItem = await newCartItem.save();
      res.status(201).json(savedCartItem);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { itemId, userId } = req.params;
  try {
    const cartItem = await CartItem.findOne({ itemId, user: userId });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    await cartItem.deleteOne();
    res.json({ message: "Cart item removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
