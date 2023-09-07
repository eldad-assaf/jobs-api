const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true, // Ensure usernames are unique
    required: [true, "Please provide name"], // Username is required
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    unique: true, // Ensure email addresses are unique
    required: [true, "Please provide email"], // Email is required
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"], // Password is required
    minLength: 6,
    maxLength: 12,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default value for createdAt is the current date
  },
});

// Create the User model
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
