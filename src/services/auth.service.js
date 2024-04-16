const httpStatus = require('http-status');
const bcrypt = require('bcrypt')
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model')
const envVariables = require('../configurations/validate.env')


module.exports.loginWithPassword=async (reqBody)=>{
    const user = await User.fetchUserByEmail(reqBody.email)
    if (!user || !(await bcrypt.compare(reqBody.password,user.password))){
        throw new ApiError(httpStatus.BAD_REQUEST,"Incorrect email or password")
    }
    return user
}

module.exports.getUserIdFromToken=async()=>{
    const token = req.headers.authorization.split(" ")[1];
    const decode = await jwt.verify(token, envVariables.jwt_access_secret);
    return decode.userId
}