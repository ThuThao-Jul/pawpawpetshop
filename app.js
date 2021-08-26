const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const mongoose = require('mongoose');

const app = express();
require("dotenv").config();
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

module.exports = app;
