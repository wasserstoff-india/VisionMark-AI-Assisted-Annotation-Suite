const httpStatus = require('http-status')
const {createUser} = require('../services/user.service')
const asyncHandler =  require('../utils/asyncHandler')
const {generateAuthTokens,newAccessToken} = require('../services/token.service')
const authService = require('../services/auth.service')
const ApiError = require('../utils/ApiError')

/**
 * Controller to register a user and send token as response 
 */
module.exports.registerUser = asyncHandler(async (req,res)=>{
    //Calling create user service for user creation
    const user =await createUser(req.body)
    //Calling authentication token generation service
    const token=await generateAuthTokens(user._id)
    let userObj = {...user._doc}
    //Removing the password field from deep copy of user object
    delete userObj.password
    //Setting refresh token into cookie with key 'jwt'. Setting cookie to accessed and modified only by server
    res.cookie('jwt',token.refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    })
    res.status(httpStatus.CREATED).json({...userObj,token:token.accessToken})
})

/**
 * Controller for user login and sending access token in response
 */
module.exports.loginUser = asyncHandler(async(req,res)=>{
    // Login service to validate user login credentials
    const user = await authService.loginWithPassword(req.body)
    //Login if user is validated generating the JWT tokens
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

/**
 * Logout controller to logout user
 */
module.exports.logout=asyncHandler(async(req,res)=>{
    const cookies = req.cookies
    //Checking where the user is having cookie for validation or not
    if (!cookies?.jwt) {
        return res.send(httpStatus.NO_CONTENT).json({message:"Something went wrong"})
    }
    //Clearing the refresh token from cookie
    req.clearCookie('jwt',{ httpOnly: true, sameSite: 'None', secure: true })
    res.status(httpStatus.OK).json({message:"User logged out"})
})

/**
 * Controller to generate a new access token if previous token gets expired
 */
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