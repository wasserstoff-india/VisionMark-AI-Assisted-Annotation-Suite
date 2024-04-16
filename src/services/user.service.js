const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const saltRound = 10;

/**
 * Service to create/register a user
 * @param {*} reqBody 
 * @returns 
 */
module.exports.createUser = async (reqBody) => {
  try {
    //Check user uniqness
    if (await User.isEmailUnique(reqBody.email)) {
      throw new ApiError(httpStatus.CONFLICT, "User already exists with email.");
    }
    const users = await User.find({})
    //Only Assumption
    // Checking if 1st user is regisetring assign him admin role
    if(users.length==0){
      reqBody.role="admin"
    }
    //Generating hashed password
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

/**
 * Service to fetch user by id
 * @param {*} id 
 * @returns 
 */
module.exports.getUserById= async(id)=>{
    const user = await User.fetchUserById(id)
    return user
}

/**
 * Service to get all users from DB
 * @returns 
 */
module.exports.getAllUsers = async()=>{
  const users = await User.find({}).select('-password')
  return users
}
