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

module.exports.getImageById=async(id)=>{
  const image = await Image.findById(id)
  return image
}

module.exports.getAllImagesForUser=async(userId)=>{
  const images = await Image.find({userId:userId})
  return images
}

module.exports.getApprovedImagesWithCustomFields= async()=>{
  const images = await Image.find({status:"approved"}).select("-userId -id -__v")
  return images
}