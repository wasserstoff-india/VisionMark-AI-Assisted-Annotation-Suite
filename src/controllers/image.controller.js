const asyncHandler = require('../utils/asyncHandler')
const {getAllImages,getImagesWithStatus,getImageById,getAllImagesForUser} = require('../services/image.service')
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const {getUserIdFromToken} =require('../services/auth.service')

module.exports.fetchAllImages=asyncHandler(async(req,res)=>{
    const images =  await getAllImages()
    res.status(httpStatus.OK).send(images)
})

module.exports.fetchImagesWithStatus = asyncHandler(async(req,res)=>{
    const images =  await getImagesWithStatus(req.query.status)
    res.status(httpStatus.OK).send(images)
})

module.exports.fetchImageById = asyncHandler(async(req,res)=>{
    const image =  await getImageById(req.params.id)
    if(!image){
        next(new ApiError(httpStatus.NOT_FOUND,"Image does not exists with provided imageId."))
    }
    res.status(httpStatus.OK).send(image)
})

module.exports.fetchImagesOfUser = asyncHandler(async(req,res)=>{
    const userId = await getUserIdFromToken()
    const images = await getAllImagesForUser(userId)
    res.status(httpStatus.OK).send(images)
})