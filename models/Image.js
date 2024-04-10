const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  filename: String,
  filePath: String,
  annotation: String,
  requestStatus : {
    type : String,
    default : 'PENDING'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
}, { timestamps: true });

module.exports = Image = mongoose.model('image', ImageSchema);

