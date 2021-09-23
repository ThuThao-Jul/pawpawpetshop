"use trisct";

const { findById } = require("../models/user");
const User = require("../models/user");

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

utilHelper.updatePoint= async (userId, totalCost) => {
    let addedPoint = totalCost*0.001;
    let user = await User.findByIdAndUpdate(userId, { $inc: {point: addedPoint}});
    let updatedUser = await User.findById(userId);
    let point = updatedUser.point;
    let tier = updatedUser.tier;

    if(point>=800 && tier==='bronze'){
        user = await User.findByIdAndUpdate(userId, {tier: 'silver'});
        user.reward.push({
            item: '613db72cce10c420bdbce47a',
        });
        await user.save();
    };
    if(point>=3500 && tier==='silver'){
        user = await User.findByIdAndUpdate(userId, {tier: 'gold'});
        user.reward.push({
            item: '613dc734ce10c420bdbce484'
        });
        await user.save();
    };
    if(point>=8000 && tier==='gold'){
        user = await User.findByIdAndUpdate(userId, {tier: 'platinum'});
        user.reward.push({
            item: '613e063fc5b2a7503bd03b97'
        });
        await user.save();
    }
}


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