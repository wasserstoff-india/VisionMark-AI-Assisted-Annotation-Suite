const express = require('express');
const router = express.Router();
const {getAllImages,uploadImage} = require('../controllers/imageController');
router.post('/upload', uploadImage);
router.get('/', getAllImages);

module.exports = router;
