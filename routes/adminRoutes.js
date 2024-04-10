const express = require('express');
const router = express.Router();
const {reviewImages, handleRequests} = require('../controllers/adminController');
const isAdmin = require('../middlewares/Admin')

router.get('/review', isAdmin, reviewImages);
router.put('/request', isAdmin, handleRequests);
// router.get('/export',isAdmin, exportAnnotations);
// Other routes as needed

module.exports = router;
