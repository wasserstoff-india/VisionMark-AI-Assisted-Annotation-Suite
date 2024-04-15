const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const envVariables = require("../configurations/validate.env");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");

module.exports.generateToken = async (userId, secret, expire) => {
  const payload = {
    userId: userId,
  };
  return await jwt.sign(payload, secret, { expiresIn: expire });
};

module.exports.generateAuthTokens = async (userId) => {
  try {
    const accessToken = await this.generateToken(
      userId,
      envVariables.jwt_access_secret,
      envVariables.jwt_access_expiry
    );
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

module.exports.newAccessToken = async (token) => {
  try {
    const decode = await jwt.verify(token, envVariables.jwt_access_secret);
    if (!(await decode)) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized user.");
    }
    const user = await User.fetchUserByEmail(decode.email);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized user.");
    }
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
