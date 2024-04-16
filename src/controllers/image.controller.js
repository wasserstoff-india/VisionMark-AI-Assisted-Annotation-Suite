const asyncHandler = require('../utils/asyncHandler')
const imageService = require('../services/image.service')
const Image = require('../models/image.model');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

module.exports.fetchAllImages=asyncHandler(async(req,res)=>{
    const images =  await imageService.getAllImages()
    res.status(httpStatus.OK).send(images)
})

module.exports.fetchImagesWithStatus = asyncHandler(async(req,res)=>{
    const images =  await imageService.getImagesWithStatus(req.query.status)
    res.status(httpStatus.OK).send(images)
})

module.exports.reviewImageAnnotation = asyncHandler(async (req,res)=>{
    
})