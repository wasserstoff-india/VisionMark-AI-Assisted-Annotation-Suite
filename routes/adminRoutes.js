const express = require("express");
const router = express.Router();
const {
  reviewImages,
  handleRequests,
} = require("../controllers/adminController");
const isAdmin = require("../middlewares/Admin");

// GET - Route for review of image
router.get("/review", isAdmin, reviewImages);

// PUT - Route for handing of request by admin user
router.put("/request", isAdmin, handleRequests);

module.exports = router;
