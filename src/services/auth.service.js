const httpStatus = require('http-status');
const bcrypt = require('bcrypt')
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model')
const userService = require('./user.service')
const tokenService = require('./token.service')
const saltRound=10

module.exports.loginWithPassword=async (reqBody)=>{
    const user = await User.fetchUserByEmail(reqBody.email)
    if (!user || !(await bcrypt.compare(reqBody.password,user.password))){
        throw new ApiError(httpStatus.BAD_REQUEST,"Incorrect email or password")
    }
    return user
}