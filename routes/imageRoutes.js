const express = require("express");
const router = express.Router();
const { uploadImage } = require("../controllers/imageController");

// POST - Route for uploading image
router.post("/upload", uploadImage);

module.exports = router;
