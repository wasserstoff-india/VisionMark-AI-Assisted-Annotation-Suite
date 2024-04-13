class ErrorApi extends Error{
    constructor(status,message,stack=''){
        super(message);
        this.statusCode=status
        if (stack) {
            this.stack = stack;
          } else {
            Error.captureStackTrace(this, this.constructor);
          }
    }
}

module.exports = ErrorApi