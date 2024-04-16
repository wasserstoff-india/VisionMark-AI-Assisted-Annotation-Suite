const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const envVariables = require("../configurations/validate.env");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");

/**
 * Service to generate token using jwt
 * @param {*} userId 
 * @param {*} secret 
 * @param {*} expire 
 * @returns 
 */
module.exports.generateToken = async (userId, secret, expire) => {
  const payload = {
    userId: userId,
  };
  return await jwt.sign(payload, secret, { expiresIn: expire });
};

/**
 * Service to generate authentication token
 * @param {*} userId 
 * @returns 
 */
module.exports.generateAuthTokens = async (userId) => {
  try {
    //Generate access token
    const accessToken = await this.generateToken(
      userId,
      envVariables.jwt_access_secret,
      envVariables.jwt_access_expiry
    );
    //Generate the refresh token
    const refreshToken = await this.generateToken(
      userId,
      envVariables.jwt_refresh_secret,
      envVariables.jwt_refresh_expiry
    );
    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error."
    );
  }
};

/**
 * Service to generate new access token
 * @param {*} token 
 * @returns 
 */
module.exports.newAccessToken = async (token) => {
  try {
    const decode = await jwt.verify(token, envVariables.jwt_access_secret);
    //Checking the decode for userId
    if (!(await decode)) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized user.");
    }
    const user = await User.fetchUserByEmail(decode.email);
    //Checking whether user present on DB
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized user.");
    }
    //Generate the access token
    const accessToken = await this.generateToken(
      user._id,
      envVariables.jwt_access_secret,
      envVariables.jwt_access_expiry
    );
    return accessToken;
  } catch (err) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error."
    );
  }
};
