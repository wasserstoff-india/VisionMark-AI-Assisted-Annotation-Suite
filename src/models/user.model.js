const mongoose = require('mongoose')

/**
 * Defining user schema
 */
const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
      },
      contact_no:{
        type:String,
        required:true,
        trim:true,
        minlength:10
      },
      role: {
        type: String,
        enum: ["user","admin"],
        default: 'user',
      },
    },
    {
      timestamps: true,
    }
  );

  /**
   * User model static method to check email uniquness
   * @param {*} email 
   * @returns 
   */
  userSchema.statics.isEmailUnique = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
  };

  /**
   * USer model static method to fetch user by email
   * @param {*} email 
   * @returns 
   */
  userSchema.statics.fetchUserByEmail = async function(email){
    const user = await this.findOne({ email });
    return user;
  }

  /**
   * User model static method to fetch user by id without password field
   * @param {*} id 
   * @returns 
   */
  userSchema.statics.fetchUserById = async function(id){
    const user = await User.findById(id).select("-password");
    return user;
  }

  const User = mongoose.model('User',userSchema)
  module.exports = User