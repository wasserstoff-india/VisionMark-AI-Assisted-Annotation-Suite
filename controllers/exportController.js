

const Image = require('../models/Image');
const xmlbuilder = require('xmlbuilder');

async function getApprovedAnnotationsAsCSV() {
  try {
    // Fetch approved annotations from the database
    const approvedAnnotations = await Image.find({ requestStatus: 'APPROVED' });

    // Convert annotations to CSV format
    const csvData = convertToCSV(approvedAnnotations);

    return csvData;
  } catch (error) {
    throw new Error('Error fetching approved annotations: ' + error.message);
  }
}

function convertToCSV(annotations) {
  // Define CSV header
  const header = ['Image Name', 'Annotation', 'Status'];

  // Convert annotations to CSV rows
  const csvRows = annotations.map(annotation => {
    return [
      annotation.filename,
      annotation.annotation,
      annotation.requestStatus
    ];
  });

  // Combine header and rows
  const csvContent = [header, ...csvRows].map(row => row.join(',')).join('\n');

  return csvContent;
}


async function getApprovedAnnotationsAsJSON() {
    try {
        // Query the database to fetch approved annotations
        const approvedAnnotations = await Image.find({ requestStatus: 'APPROVED'  }).select('filename annotation requestStatus -_id');
        console.log("🚀 ~ getApprovedAnnotationsAsJSON ~ approvedAnnotations:", approvedAnnotations)

        // Return the fetched annotations in JSON format
        return JSON.stringify(approvedAnnotations);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error fetching approved annotations:', error);
        throw new Error('Error fetching approved annotations');
    }
}

async function getApprovedAnnotationsAsXML() {
    try {
        // Query the database to fetch approved annotations
        const approvedAnnotations = await Image.find({ requestStatus: 'APPROVED' }).select('filename annotation requestStatus -_id');

        // Create XML root element
        const root = xmlbuilder.create('annotations');

        // Loop through each annotation and add it to the XML
        approvedAnnotations.forEach(annotation => {
            const annotationXML = root.ele('annotation');
            annotationXML.ele('filename', annotation.filename);
            annotationXML.ele('annotation', annotation.annotation);
            annotationXML.ele('requestStatus', annotation.requestStatus);
        });

        // Return the XML as a string
        return root.end({ pretty: true });
    } catch (error) {
        console.error('Error fetching approved annotations:', error);
        throw new Error('Error fetching approved annotations');
    }
}



const exportCSV = async (req, res) => {
    try {
      const csvData = await getApprovedAnnotationsAsCSV();
      const filename = 'annotations.csv';
      res.setHeader('Content-disposition', `attachment; filename=${filename}`);
      res.set('Content-Type', 'text/csv');
      res.send(csvData);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

const exportJSON = async (req, res) => {
    try {
        const jsonData = await getApprovedAnnotationsAsJSON();
        res.json(jsonData);
    } catch (error) {
        console.error('Error exporting JSON:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Route to export approved annotations as XML
const exportXML = async (req, res) => {
    try {
        const xmlData = await getApprovedAnnotationsAsXML();
        res.header('Content-Type', 'application/xml');
        res.attachment('annotations.xml'); 
        res.send(xmlData);
    } catch (error) {
        console.error('Error exporting XML:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

  module.exports = { exportCSV,exportJSON,exportXML };


