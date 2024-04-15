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

  const User = mongoose.model('User',userSchema)
  module.exports = User