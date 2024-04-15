const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
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
  userSchema.statics.isEmailUnique = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
  };

  userSchema.statics.fetchUserByEmail = async function(email){
    const user = await this.findOne({ email });
    return user;
  }
  userSchema.statics.fetchUserById = async function(id){
    const user = await this.findOne({ id });
    return user;
  }

  const User = mongoose.model('User',userSchema)
  module.exports = User