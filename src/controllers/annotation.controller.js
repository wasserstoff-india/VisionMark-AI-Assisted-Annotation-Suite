const path = require('path')
const asyncHandler = require('../utils/asyncHandler')
const {createImage,manualAnnotation,reviewImageAnnotation, automaticAnnotate} = require('../services/annotation.service')
const Image = require('../models/image.model');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
module.exports.uploadImageAndAnnotate=asyncHandler(async (req,res)=>{
    try{

        const image = await new Promise((resolve, reject) => {
            Image.uploadImage(req, res, function(err) {
                if (err) {
                    reject(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error uploading image"));
                } else if (req.file) {
                    const imagePath = path.join(Image.imagePath, req.file.filename);

                    automaticAnnotate(imagePath)
                        .then(labelsWithCoordinates => createImage(req.body.userId, imagePath, labelsWithCoordinates))
                        .then(resolve)
                        .catch(err => reject(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal server error")));
                } else {
                    reject(new ApiError(httpStatus.BAD_REQUEST, "File not provided"));
                }
            });
        });

        res.send(httpStatus.CREATED).json({...image._doc})
        
    }catch(err){
        next(err)
    }
})

module.exports.manualAnnotate = asyncHandler(async (req,res)=>{
    const image = await manualAnnotation(req.params.id,req.body.annotation)
    res.status(httpStatus.OK).json({...image._doc})
})

module.exports.reviewImageAnnotation = asyncHandler(async (req,res)=>{
    const image = await reviewImageAnnotation(req.params.id,req.body.status)
    res.status(httpStatus.OK).send(image._doc)
})