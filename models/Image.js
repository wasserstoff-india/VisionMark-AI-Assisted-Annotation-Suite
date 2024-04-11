const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for uploaded image
// Assuming for all images uploaded request status is Pending
// User is also mapped for identifying which user has uploaded the image
const ImageSchema = new Schema(
  {
    filename: String,
    filePath: String,
    annotation: String,
    requestStatus: {
      type: String,
      default: "PENDING",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = Image = mongoose.model("image", ImageSchema);
