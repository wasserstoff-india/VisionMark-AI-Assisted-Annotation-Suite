const httpStatus = require('http-status')
const {getAllUsers,getUserById} = require('../services/user.service')
const asyncHandler =  require('../utils/asyncHandler')


module.exports.getUserById = asyncHandler(async (req,res)=>{
    const user = await getUserById(req.params.id)
    if(!user){
        throw new ApiError(httpStatus.NOT_FOUND, "User not found.");
    }
    res.status(httpStatus.OK).json({code:httpStatus.OK,...user._doc})
})

module.exports.getAllUsers = asyncHandler(async (req,res)=>{
    const users = await getAllUsers()
    res.status(httpStatus.OK).send(users)
})