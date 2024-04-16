const path = require('path')
const asyncHandler = require('../utils/asyncHandler')
const {createImage,manualAnnotation,reviewImageAnnotation, automaticAnnotate} = require('../services/annotation.service')
const Image = require('../models/image.model');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

/**
 * Controller to upload an image ana run AI pre-trained model to annotate the image
 */
module.exports.uploadImageAndAnnotate=asyncHandler(async (req,res)=>{
    try{
        const image = await new Promise((resolve, reject) => {
            //Uploads the image from req.file
            Image.uploadImage(req, res, function(err) {
                if (err) {
                    reject(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error uploading image"));
                } else if (req.file) {
                    //Image file path+filename
                    const imagePath = path.join(Image.imagePath, req.file.filename);
                    //Calling automatic annotation service
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

/**
 * Controller to manually annotate the image by user. Fetchs the id of image to be annotated from request parmas.
 */
module.exports.manualAnnotate = asyncHandler(async (req,res)=>{
    const image = await manualAnnotation(req.params.id,req.body.annotation)
    res.status(httpStatus.OK).json({...image._doc})
})

/**
 * Review of annotated image by admin user.
 */
module.exports.reviewImageAnnotation = asyncHandler(async (req,res)=>{
    const image = await reviewImageAnnotation(req.params.id,req.body.status)
    res.status(httpStatus.OK).send(image._doc)
})