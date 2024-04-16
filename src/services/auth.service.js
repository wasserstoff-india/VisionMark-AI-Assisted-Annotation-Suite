const httpStatus = require('http-status');
const bcrypt = require('bcrypt')
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model')
const envVariables = require('../configurations/validate.env')

/**
 * Service to check credentials of user on login
 * @param {*} reqBody 
 * @returns 
 */
module.exports.loginWithPassword=async (reqBody)=>{
    const user = await User.fetchUserByEmail(reqBody.email)
    //Comparing the hashed password with request body raw password
    if (!user || !(await bcrypt.compare(reqBody.password,user.password))){
        throw new ApiError(httpStatus.BAD_REQUEST,"Incorrect email or password")
    }
    return user
}

/**
 * Service to fetch userId from token
 * @returns 
 */
module.exports.getUserIdFromToken=async()=>{
    const token = req.headers.authorization.split(" ")[1];
    const decode = await jwt.verify(token, envVariables.jwt_access_secret);
    return decode.userId
}