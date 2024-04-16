const httpStatus = require('http-status')
const {createUser} = require('../services/user.service')
const asyncHandler =  require('../utils/asyncHandler')
const {generateAuthTokens,newAccessToken} = require('../services/token.service')
const authService = require('../services/auth.service')
const ApiError = require('../utils/ApiError')


module.exports.registerUser = asyncHandler(async (req,res)=>{
    const user =await createUser(req.body)
    const token=await generateAuthTokens(user._id)
    let userObj = {...user._doc}
    delete userObj.password
    res.cookie('jwt',token.refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    })
    res.status(httpStatus.CREATED).json({...userObj,token:token.accessToken})
})

module.exports.loginUser = asyncHandler(async(req,res)=>{
    const user = await authService.loginWithPassword(req.body)
    const token = await generateAuthTokens(user._id)
    let userObj = {...user._doc}
    delete userObj.password
    res.cookie('jwt',token.refreshToken,{
        httpOnly: true,
        secure: true,sameSite:true,
        maxAge: 24 * 60 * 60 * 1000
    })
    res.status(httpStatus.CREATED).json({...userObj,token:token.accessToken})
})

module.exports.logout=asyncHandler(async(req,res)=>{
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.send(httpStatus.NO_CONTENT).json({message:"Something went wrong"})
    }
    req.clearCookie('jwt',{ httpOnly: true, sameSite: 'None', secure: true })
    res.status(httpStatus.OK).json({message:"User logged out"})
})

module.exports.refresh=asyncHandler(async(req,res)=>{
    if(req.cookie('jwt')){
        throw new ApiError(httpStatus.UNAUTHORIZED,"Unauthorized user")
    }
    const cookie = req.cookie('jwt')
    const token = await newAccessToken(cookie)
    res.send(httpStatus.OK).json({
        message:"Token is refreshed.",
        token:token
    })
})