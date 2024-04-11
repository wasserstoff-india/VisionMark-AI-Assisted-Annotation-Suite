const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { registerUser, loginUser, registerForAdminUser } = require("../controllers/authController");
const isAdmin = require("../middlewares/Admin");

// POST - Route for registering new user
// When a user registers by default it is normal user
// For Admin user initially it can be manually created by changing role as "admin"
// And an Admin user can have the option for creating both normal and admin users
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
  "/admin",
  isAdmin,
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is not in correct format").isEmail(),
    check("password", "Password length should be greater than 6").isLength({
      min: 6,
    }),
    check("role", "Role is required").not().isEmpty(),
  ],
  registerForAdminUser
);

// POST - Route for login user
router.post(
  "/login",
  [
    check("email", "Email is not in correct format").isEmail(),
    check("password", "Password length should be greater than 6").isLength({
      min: 6,
    }),
  ],
  loginUser
);

module.exports = router;
