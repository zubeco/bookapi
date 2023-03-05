const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user with hashed password
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Return user without password field
    const userWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.password;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    // Check if user exists in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET);

    // Return user details along with token
    res.status(200).json({
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
