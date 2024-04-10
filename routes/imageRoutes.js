const express = require('express');
const router = express.Router();
const {uploadImage} = require('../controllers/imageController');
router.post('/upload', uploadImage);

module.exports = router;
