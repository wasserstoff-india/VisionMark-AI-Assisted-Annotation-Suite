const mongoose = require('mongoose')
const fs = require('fs')
const multer = require('multer');
const path = require('path');
const IMAGE_PATH = path.join('public/images');

/**
 * Defining annotation schema
 */
const annotationSchema = new mongoose.Schema({
    label: {
      type: String,
    },
    coordinates: mongoose.Schema.Types.Mixed,
    confidence:{
        type: Number
    }
  });

  /**
   * Image schema
   */
const imageSchema = new mongoose.Schema({
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        image:{
            type:String,
            required: true
        },
        annotations:[annotationSchema],
        status:{
            type:String,
            enum:['review','approved','rejected'],
            default:'review'
        }
})

/**
 * Multer configuration for file type storage
 */
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
         //Check whether the directory exists or not
         if(!fs.existsSync(path.join(__dirname, '..', IMAGE_PATH))){
            //If directory doesn't exists creates a directory synchronously
            fs.mkdirSync(path.join(__dirname, '..', IMAGE_PATH), { recursive: true })
        }

      cb(null, path.join(__dirname, '..', IMAGE_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

/**
 * Static model methods
 */
imageSchema.statics.uploadImage = multer({storage:  storage}).single('image');
imageSchema.statics.imagePath =IMAGE_PATH;

const Image = mongoose.model('Image',imageSchema)
module.exports= Image