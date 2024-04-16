const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

/**
 * Error handler middleware for unhandled errors
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.errorHandler=(err,req,res,next)=>{
  //Checking the API Error and sending required response
  if(err instanceof ApiError){
    let { statusCode, message } = err;
    res.locals.errorMessage = err.message;
  
    const response = {
      code: statusCode,
      message,
    };
    res.status(statusCode).send(response);
  }else{
    //Sending response as internal server error for non ApiErrors
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({"message":"Something went wrong"})
  }
   
}