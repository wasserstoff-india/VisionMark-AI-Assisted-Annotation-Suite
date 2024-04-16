const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const Image = require('../models/image.model')

module.exports.getAllImages=async()=>{
  const images = await Image.find({})
  return images
}

module.exports.getImagesWithStatus=async(status)=>{
  try{
  const images = await Image.aggregate([{$match:{status:status}}])
  return images
  }catch{
    next( new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Something went wrong"))
  }
}