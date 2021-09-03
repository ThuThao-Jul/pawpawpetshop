const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require("dotenv").config();
const cors = require('cors')

const indexRouter = require('./routes/index');
const mongoose = require('mongoose');

const app = express();
const DATABASE_URL = process.env.DATABASE_URL;
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(DATABASE_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => {
    console.log('mongoose connected')
});

app.use('/api', indexRouter);

//Catch 404 error and forward to the error handler
app.use((req,res,next)=>{
    const err = new Error("Not found");
    err.statusCode = 404;
    next(err)
});

const utilHelper = require("./helpers/utils.helper");

//Error handling
app.use((err,req,res,next) => {
    console.log("ERR", err);
    if (err.isOperational) {
        return utilHelper.sendResponse(
            res,
            err.statusCode ? err.statusCode : 500,
            false,
            null,
            { message: err.message},
            err.errorType
        );
    } else {
        return utilHelper.sendResponse(
            res,
            err.statusCode ? err.statusCode : 500,
            false,
            null,
            { message: err.message},
            "Internal Server Error"
        );
    }
});

module.exports = app;
