const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

module.exports.errorHandler=(err,req,res,next)=>{
  if(err instanceof ApiError){
    let { statusCode, message } = err;
    res.locals.errorMessage = err.message;
  
    const response = {
      code: statusCode,
      message,
    };
    res.status(statusCode).send(response);
  }else{
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({"message":"Something went wrong"})
  }
   
}