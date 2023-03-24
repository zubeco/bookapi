const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    // removing the required field
  },
  price: {
    type: Number,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
