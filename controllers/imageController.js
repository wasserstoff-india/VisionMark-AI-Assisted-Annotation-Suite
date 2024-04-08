const multer = require("multer");
// const Image = require('../models/Image');
const path = require("path");
const { spawn } = require("child_process");

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const uploadImage = (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred
      return res
        .status(500)
        .json({ error: "Multer error occurred", message: err.message });
    } else if (err) {
      // An unknown error occurred
      return res
        .status(500)
        .json({ error: "An error occurred", message: err.message });
    }

    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Get the path to the uploaded file
    const imagePath = path.join(__dirname, "..", "uploads", req.file.filename);

    // Annotate the uploaded image
    annotateImage(imagePath).then((annotation) => {
      res
        .status(200)
        .json({ message: "Image uploaded and annotated", annotation });
    });
  });
};

function annotateImage(imagePath) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn(
      "/Library/Frameworks/Python.framework/Versions/3.12/bin/python3",
      [
        `${path.resolve(__dirname, "..", "Annotation/Annotation.py")}`,
        imagePath,
      ]
    );
    let annotation = "";

    pythonProcess.stdout.on("data", (data) => {
      console.log("🚀 ~ pythonProcess.stdout.on ~ data:", data);
      annotation += data.toString();
    });

    pythonProcess.on("close", (code) => {
      console.log(`Child process exited with code ${code}`);
      if (code === 0) {
        console.log("🚀 ~ pythonProcess.on ~ annotation:", annotation);
        resolve(annotation); // Resolve the promise with the annotation data
      } else {
        reject(new Error(`Child process exited with non-zero code ${code}`));
      }
    });

    pythonProcess.on("error", (err) => {
      console.error("Failed to spawn Python process:", err);
      reject(err); // Reject the promise with the error
    });
  });
}

getAllImages = (req, res) => {
  // Logic to get all images from MongoDB
};

module.exports = { getAllImages, uploadImage };
