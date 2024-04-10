const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { check } = require("express-validator");

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is not in correct format").isEmail(),
    check("password", "Password length should be greater than 6").isLength({
      min: 6,
    }),
  ],
  registerUser
);

router.post(
  "/login",
  [
    // check("name", "Name is required").not().isEmpty(),
    check("email", "Email is not in correct format").isEmail(),
    check("password", "Password length should be greater than 6").isLength({
      min: 6,
    }),
  ],
  loginUser
);

module.exports = router;
