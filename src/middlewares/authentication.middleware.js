const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const envvariables = require("../configurations/validate.env");
const User = require("../models/user.model");
const userService = require("../services/user.service");
const { errorHandler } = require("./error.middleware");

module.exports.authenticateAdmin = async (req, res, next) => {
  try {
    if (! req.headers.authorization) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User unauthorized");
    }
    const token = req.headers.authorization.split(" ")[1];
    const decode = await jwt.verify(token, envvariables.jwt_access_secret);
    if (!decode) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User unauthorized");
    }
    const user = await User.fetchUserById(decode.userId);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User unauthorized");
    }
    if (!user.role === "admin") {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User unauthorized");
    }
    next();
  } catch(err){
      next(err)
  }
};

module.exports.authenticateUser = async (req, res, next) => {
    try {

      const token = req.headers.authorization.split(" ")[1];
      const decode = await jwt.verify(token, envvariables.jwt_access_secret);
      if (!decode) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "User unauthorized");
      }
      const user = await User.fetchUserById(decode.userId);
      if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "User unauthorized");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
  