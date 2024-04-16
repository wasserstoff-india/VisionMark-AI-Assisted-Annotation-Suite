const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const Image = require('../models/image.model')

/**
 * Get all images from DB
 * @returns 
 */
module.exports.getAllImages=async()=>{
  const images = await Image.find({})
  return images
}

/** 
 * Service to get images by status
 */
module.exports.getImagesWithStatus=async(status)=>{
  try{
  const images = await Image.aggregate([{$match:{status:status}}])
  return images
  }catch{
    next( new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Something went wrong"))
  }
}

/**
 * Service to fetch images by imageId
 * @param {*} id 
 * @returns 
 */
module.exports.getImageById=async(id)=>{
  const image = await Image.findById(id)
  return image
}

/**
 * Service to fetch all the images for the user using userId
 * @param {*} userId 
 * @returns 
 */
module.exports.getAllImagesForUser=async(userId)=>{
  const images = await Image.find({userId:userId})
  return images
}

/**
 * Fetch all the approved images without userId, id, __v, field
 * @returns 
 */
module.exports.getApprovedImagesWithCustomFields= async()=>{
  const images = await Image.find({status:"approved"}).select("-userId -id -__v")
  return images
}