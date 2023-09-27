const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  // Add more fields as needed
});

module.exports = mongoose.model("User", userSchema);
