const Image = require("../models/Image");
const xmlbuilder = require("xmlbuilder");

// GET annotations from database and covert to CSV format
async function getApprovedAnnotationsAsCSV() {
  try {
    // Fetch approved annotations from the database
    const approvedAnnotations = await Image.find({ requestStatus: "APPROVED" });

    // Convert annotations to CSV format
    const csvData = convertToCSV(approvedAnnotations);

    return csvData;
  } catch (error) {
    throw new Error("Error fetching approved annotations: " + error);
  }
}

//Convert annotations to CSV format
function convertToCSV(annotations) {
  // Define CSV headers
  const header = ["Image Name", "Annotation", "Status"];

  // Convert annotations to CSV rows
  const csvRows = annotations.map((annotation) => {
    return [
      annotation.filename,
      annotation.annotation,
      annotation.requestStatus,
    ];
  });

  // Combine header and rows
  const csvContent = [header, ...csvRows]
    .map((row) => row.join(","))
    .join("\n");

  return csvContent;
}

// GET annotations from database and covert to JSON format
async function getApprovedAnnotationsAsJSON() {
  try {
    // Query the database to fetch approved annotations
    const approvedAnnotations = await Image.find({
      requestStatus: "APPROVED",
    }).select("filename annotation requestStatus -_id");

    // Return the fetched annotations in JSON format
    return JSON.stringify(approvedAnnotations);
  } catch (error) {
    // Handle any errors that occur during the process
    throw new Error("Error fetching approved annotations :", error);
  }
}

// GET annotations from database and covert to XML format
async function getApprovedAnnotationsAsXML() {
  try {
    // Query the database to fetch approved annotations
    const approvedAnnotations = await Image.find({
      requestStatus: "APPROVED",
    }).select("filename annotation requestStatus -_id");

    // Create XML root element
    const root = xmlbuilder.create("annotations");

    // Loop through each annotation and add it to the XML
    approvedAnnotations.forEach((annotation) => {
      const annotationXML = root.ele("annotation");
      annotationXML.ele("filename", annotation.filename);
      annotationXML.ele("annotation", annotation.annotation);
      annotationXML.ele("requestStatus", annotation.requestStatus);
    });

    // Return the XML as a string
    return root.end({ pretty: true });
  } catch (error) {
    throw new Error("Error fetching approved annotations :", error);
  }
}

// Controller for Exporting approved annotations to CSV
const exportCSV = async (req, res) => {
  try {
    const csvData = await getApprovedAnnotationsAsCSV();
    const filename = "annotations.csv";
    res.setHeader("Content-disposition", `attachment; filename=${filename}`);
    res.set("Content-Type", "text/csv");
    res.send(csvData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for Exporting approved annotations to JSON
const exportJSON = async (req, res) => {
  try {
    const jsonData = await getApprovedAnnotationsAsJSON();
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for Exporting approved annotations to XML
const exportXML = async (req, res) => {
  try {
    const xmlData = await getApprovedAnnotationsAsXML();
    res.header("Content-Type", "application/xml");
    res.attachment("annotations.xml");
    res.send(xmlData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { exportCSV, exportJSON, exportXML };
