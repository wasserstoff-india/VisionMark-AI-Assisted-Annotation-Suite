const { createObjectCsvWriter } = require("csv-writer");
const fs = require("fs");
const path = require("path");
const { parse } = require("js2xmlparser");
const { getApprovedImagesWithCustomFields } = require("./image.service");
const exportPath = path.join(path.resolve(), "src", "public", "export");

/**
 * Service to check type of export data and fetching the images from DB
 * @param {*} type 
 */
module.exports.exportData = async (type) => {
  //Fetch all the approved images from DB
  const images = await getApprovedImagesWithCustomFields();
  // Check whether the path for exporting file exists or not
  if (!fs.existsSync(exportPath)) {
    //Creating a directory for exporting file if not exists
    fs.mkdirSync(exportPath, { recursive: true });
  }
  //Checking the type of export data
  if (type === "csv") {
    await this.csv(images);
  } else if (type === "xml") {
    await this.xml(images);
  } else if (type === "json") {
    await this.json(images);
  } else {
    next(err);
  }
};

/**
 * CSV service to create csv file and writing csv data
 * @param {*} images 
 */
module.exports.csv = async (images) => {
  const csvHeader = [
    { id: "label", title: "Label" },
    { id: "x_coordinate", title: "X Coordinate" },
    { id: "y_coordinate", title: "Y Coordinate" },
    { id: "confidence", title: "Confidence" },
  ];

  // Create a CSV writer
  const csvWriter = createObjectCsvWriter({
    path: path.join(exportPath, "data.csv"),
    header: csvHeader,
  });
  let csvData = [];
  //Creating array to format data in csv
  images.forEach((data) => {
    data.annotations.forEach((annotation) => {
      csvData.push({
        label: annotation.label,
        x_coordinate: annotation.coordinates.x,
        y_coordinate: annotation.coordinates.y,
        confidence: annotation.confidence,
      });
    });
  });
  //Writing the data to csv file
  await csvWriter
    .writeRecords(csvData)
    .then(() => {
      return "success";
    })
    .catch((error) => {
      next(error);
    });
};

/**
 * Service to fetch js object data and parse to xml and write to xml file
 * @param {*} images 
 */
module.exports.xml = async (images) => {
  //Parsing the array and converting it to xml format
  const xmlData = parse(
    "images",
    images.flatMap(({ annotations }) =>
      annotations.map(({ label, coordinates, confidence }) => ({
        annotation: {
          label,
          coordinates_x: coordinates.x,
          coordinates_y: coordinates.y,
          confidence,
        },
      }))
    ),
    { declaration: { include: false } }
  );
  // Write the XML data to a file
  await fs.writeFileSync(
    path.join(exportPath, "xmlAnnotations.xml"),
    xmlData,
    "utf8",
    (err) => {
      if (err) {
        next(err);
      } else {
        return "success";
      }
    }
  );
};

/**
 * Service to write array to json file
 * @param {*} images 
 */
module.exports.json = async (images) => {
  let dataArr = [];
  images.forEach((data) => {
    data.annotations.forEach((annotation) => {
      dataArr.push({
        label: annotation.label,
        x_coordinate: annotation.coordinates.x,
        y_coordinate: annotation.coordinates.y,
        confidence: annotation.confidence,
      });
    });
  });
  const jsonData = JSON.stringify(dataArr, null, 2);

  // Write JSON string to a file
  fs.writeFileSync(path.join(exportPath, "data.json"), jsonData, (err) => {
    if (err) {
      next(err);
    }
    return "success";
  });
};
