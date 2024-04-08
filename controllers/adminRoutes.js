const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/review', adminController.reviewImage);
router.get('/export', adminController.exportAnnotations);
// Other routes as needed

module.exports = router;
