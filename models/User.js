const mongoose = require("mongoose");
const bcrypt = require("bcryptjs/dist/bcrypt");

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
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});



userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    //'this' means the password on this document
    this.password =  await bcrypt.hash(this.password, salt);
  

   
});


// Create the User model
//const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = mongoose.model("User", userSchema);
