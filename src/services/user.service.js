const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const saltRound = 10;

module.exports.createUser = async (reqBody) => {
  if (await User.isEmailUnique(reqBody.email)) {
    throw new ApiError(httpStatus.CONFLICT, "User already exists with email.");
  }
  try {
    const hashedPassword = await bcrypt.hash(reqBody.password, saltRound);
    reqBody.password = hashedPassword;
    return User.create(reqBody);
  } catch (err) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error."
    );
  }
};

module.exports.getUserById= async(id)=>{
    const user = await User.fetchUserById(id)
    return user
}

module.exports.getUserByEmail = async(email)=>{
    const user = await User.fetchUserByEmail(email)
    return user
}