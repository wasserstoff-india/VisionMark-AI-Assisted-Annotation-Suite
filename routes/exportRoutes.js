const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/Admin'); 
const {exportCSV,exportJSON,exportXML} = require('../controllers/exportController'); 

router.get('/csv', isAdmin, exportCSV);
router.get('/json', isAdmin, exportJSON);
router.get('/xml', isAdmin, exportXML);

module.exports = router;
