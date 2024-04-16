const { createObjectCsvWriter } = require("csv-writer");
const fs = require("fs");
const path = require("path");
const { parse } = require("js2xmlparser");
const { getApprovedImagesWithCustomFields } = require("./image.service");
const exportPath = path.join(path.resolve(), "src", "public", "export");

module.exports.exportData = async (type) => {
  const images = await getApprovedImagesWithCustomFields();
  if (!fs.existsSync(exportPath)) {
    fs.mkdirSync(exportPath, { recursive: true });
  }
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

  await csvWriter
    .writeRecords(csvData)
    .then(() => {
      return "success";
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.xml = async (images) => {
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
