const mongoose = require("mongoose");

// User Schema
// When a user registers by default it is normal user
// For Admin user initially it can be manually created by changing role as "admin"
// And an Admin user can have the option for creating both normal and admin users
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
