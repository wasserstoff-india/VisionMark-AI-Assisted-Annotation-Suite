const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const saltRound = 10;

module.exports.createUser = async (reqBody) => {
  try {
    if (await User.isEmailUnique(reqBody.email)) {
      throw new ApiError(httpStatus.CONFLICT, "User already exists with email.");
    }
    const users = await User.find({})
    if(users.length==0){
      reqBody.role="admin"
    }
    const hashedPassword = await bcrypt.hash(reqBody.password, saltRound);
    reqBody.password = hashedPassword;
    return await User.create(reqBody);
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

module.exports.getAllUsers = async()=>{
  const users = await User.find({}).select('-password')
  return users
}
