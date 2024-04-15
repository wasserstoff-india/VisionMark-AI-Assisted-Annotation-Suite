class ApiError extends Error{
    constructor(status,message,stack=''){
        super(message);
        this.statusCode=status
        if (stack) {
            this.stack = stack;
            this.message=message
          } else {
            Error.captureStackTrace(this, this.constructor);
          }
    
    }
}

module.exports = ApiError