const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  filename: String,
  filePath: String,
  annotation: String,
  // Other fields as needed
}, { timestamps: true });

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
