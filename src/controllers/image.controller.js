const asyncHandler = require('../utils/asyncHandler')
const {getAllImages,getImagesWithStatus,getImageById,getAllImagesForUser} = require('../services/image.service')
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const {getUserIdFromToken} =require('../services/auth.service')

/**
 * Controller to fetch all the images from the DB
 */
module.exports.fetchAllImages=asyncHandler(async(req,res)=>{
    //Service to fetch all the images
    const images =  await getAllImages()
    res.status(httpStatus.OK).send(images)
})

/**
 * Controller to fetch the images based on status passed as query parameter
 */
module.exports.fetchImagesWithStatus = asyncHandler(async(req,res)=>{
    //Service to fetch all images with particular status
    const images =  await getImagesWithStatus(req.query.status)
    res.status(httpStatus.OK).send(images)
})

/**
 * Controller to fetch image by imageId
 */
module.exports.fetchImageById = asyncHandler(async(req,res)=>{
    //Service to fetch image by imageId
    const image =  await getImageById(req.params.id)
    if(!image){
        next(new ApiError(httpStatus.NOT_FOUND,"Image does not exists with provided imageId."))
    }
    res.status(httpStatus.OK).send(image)
})

/**
 * Controller to fetch all the images uploaded by a user
 */
module.exports.fetchImagesOfUser = asyncHandler(async(req,res)=>{
    const userId = await getUserIdFromToken()
    const images = await getAllImagesForUser(userId)
    res.status(httpStatus.OK).send(images)
})