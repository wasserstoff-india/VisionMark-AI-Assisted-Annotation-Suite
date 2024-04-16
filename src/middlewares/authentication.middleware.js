const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const envvariables = require("../configurations/validate.env");
const User = require("../models/user.model");
const userService = require("../services/user.service");
const { errorHandler } = require("./error.middleware");

/**
 * Middleware to check whether user is authorized as admin to access resources or not
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.authenticateAdmin = async (req, res, next) => {
  try {
    // Check authorization header 
    if (! req.headers.authorization) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User unauthorized");
    }
    //Extract the authorization token
    const token = req.headers.authorization.split(" ")[1];
    const decode = await jwt.verify(token, envvariables.jwt_access_secret);
    //Check whether decode userId
    if (!decode) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User unauthorized");
    }
    const user = await User.fetchUserById(decode.userId);
    //Check for user 
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User unauthorized");
    }
    //Checking the role as admin to access the resources
    if (!user.role === "admin") {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User unauthorized");
    }
    next();
  } catch(err){
      next(err)
  }
};

/**
 * Middleware to check whether user is authorized as user to access resources or not
* @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.authenticateUser = async (req, res, next) => {
    try {
      //Check for authorization header
      if (! req.headers.authorization) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "User unauthorized");
      }
      const token = req.headers.authorization.split(" ")[1];
      //Verifying the token
      const decode = await jwt.verify(token, envvariables.jwt_access_secret);
      if (!decode) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "User unauthorized");
      }
      //Fetching user info
      const user = await User.fetchUserById(decode.userId);
      if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "User unauthorized");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
  