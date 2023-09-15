const mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// Define the user schema
const UserSchema = new mongoose.Schema({
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


UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  //'this' means the password on this document
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  console.log('jwt');
 return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword =  async function (canditatePassword) {
const isMatch =  await bcrypt.compare(canditatePassword, this.password)
return isMatch

}


module.exports = mongoose.model("User", UserSchema);
