const httpStatus = require('http-status')
const userService = require('../services/user.service')
const asyncHandler =  require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')


module.exports.registerUser = asyncHandler(async (req,res)=>{
    const user =await userService.createUser(req.body)
    res.status(httpStatus.CREATED).json(new ApiResponse(httpStatus.CREATED,user,"User created successfully"))
})

