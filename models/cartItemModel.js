const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  user: {
    type: String,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("CartItem", cartItemSchema);
