const jwt = require('jsonwebtoken');
const { AppError } = require('../helpers/utils.helper');
const JWT_SECRET_KEY= process.env.JWT_SECRET_KEY

const authMiddleware = {};

authMiddleware.loginRequired = (req,res,next) => {
    try {
        const tokenString = req.headers.authorization;
        if (!tokenString) return next(new Error(401, 'Login required', 'Validation Error'));
        const token = tokenString.replace("Bearer ", "");
        jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
            console.log("err & payload", err, payload)
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return next(new Error(401, "Token expired", "Validation error"));
                } else {
                    return AppError(new Error(401, "Token is invalid", "Validation error"))
                }
            
            }

            req.userId = payload._id;
        });
        next();
    } catch (error) {
        next(error)
    }
};


authMiddleware.adminRequired = (req,res,next) => {
    try {
        const tokenString = req.headers.authorization;
        if (!tokenString) return next(new Error(401, 'Login required', 'Validation Error'));
        const token = tokenString.replace("Bearer ", "");
        jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
            console.log("err & payload", err, payload)
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return next(new Error(401, "Token expired", "Validation error"));
                } else {
                    return AppError(new Error(401, "Token is invalid", "Validation error"))
                }
            
            }

            req.userId = payload._id;
            if (payload.role !== "admin" ) { 
                return next(new Error(401, "Only for admin", "Validation error"))};
        });
        next();
    } catch (error) {
        next(error)
    }
};

module.exports = authMiddleware;