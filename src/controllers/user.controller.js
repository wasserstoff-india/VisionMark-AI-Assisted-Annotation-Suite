const httpStatus = require('http-status')
const userService = require('../services/user.service')
const asyncHandler =  require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')


module.exports.getUserById = asyncHandler(async (req,res)=>{
    const user = await userService.getUserById(req.body._id)
    if(!user){
        throw new ApiError(httpStatus.NOT_FOUND, "User not found.");
    }
    res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK,user,"User fetched"))
})

module.exports.getUserByEmail = asyncHandler(async (req,res)=>{
    const user = await userService.getUserByEmail(req.body.email)
    if(!user){
        throw new ApiError(httpStatus.NOT_FOUND, "User not found.");
    }
    res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK,user,"User fetched"))
})