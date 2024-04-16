const asyncHandler = require('../utils/asyncHandler')
const annotationService = require('../services/annotation.service')
const Image = require('../models/image.model');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
module.exports.uploadImageAndAnnotate=asyncHandler(async (req,res)=>{
    try{
       const image= await Image.uploadImage(req, res, async function (err) {
            if (err) {
                throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Error uploading image")
            }
            // Check if a file was successfully uploaded
            if (req.file) {
                const imagePath = path.join(Image.imagePath, req.file.filename);
                return image = await detectLabels(imagePath)
                .then(async (labelsWithCoordinates) => {
                   return await annotationService.createImage(req.body.userId,imagePath,labelsWithCoordinates)
                })
                .catch(err => {
                    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Internal server error")
                });
               
            } else {
                // If no file is provided, return a 400 status
                throw new ApiError(httpStatus.BAD_REQUEST,"File not provided")
            }
        });
        res.send(httpStatus.CREATED).json({...image._doc})
        
    }catch(err){
        next(err)
    }
})

module.exports.manualAnnotate = asyncHandler(async (req,res)=>{
    const image = await annotationService.manualAnnotation(req.body.imageId,req.body.annotation)
    res.status(httpStatus.OK).json({...image._doc})
})

module.exports.reviewImageAnnotation = asyncHandler(async (req,res)=>{
    const image = await annotationService.reviewImageAnnotation(req.body.imageId,req.body.status)
    res.status(httpStatus.OK).send(image._doc)
})