"use trisct";
const utilHelper = {};


// This function controls the way we response to the client
// If we need to change the way to response later on, we only need to handle it here
utilHelper.sendResponse = (res, status, success, data, error, message) => {
    const response ={};
    if (success) response.success = success;
    if (data) response.data = data;
    if (error) response.error = error;
    if(message) response.message = message;
    return res.status(status).json(response)
};


utilHelper.catchAsync = (func) => (res,req,next) =>
    func(req,res,next).catch((err) => next(err));


class AppError extends Error{
    constructor(statusCode, message, errorType){
        super(message);
        this.statusCode = statusCode;
        this.errorType = errorType;
        //all errors using this class are operational error.
        this.isOperational = true;
        //create a stack trace for debugging
        Error.captureStackTrace(this, this.constructor);
    }
};
utilHelper.AppError = AppError;

module.exports = utilHelper;