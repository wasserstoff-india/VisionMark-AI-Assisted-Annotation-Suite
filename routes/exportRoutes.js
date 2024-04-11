const express = require("express");
const router = express.Router();
const isAdmin = require("../middlewares/Admin");
const {
  exportCSV,
  exportJSON,
  exportXML,
} = require("../controllers/exportController");

// GET - Route for exporting annotation data to CSV file
router.get("/csv", isAdmin, exportCSV);

// GET - Route for exporting annotation data to JSON file
router.get("/json", isAdmin, exportJSON);

// GET - Route for exporting annotation data to XML file
router.get("/xml", isAdmin, exportXML);

module.exports = router;
