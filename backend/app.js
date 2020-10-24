var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');


const { PORT, MONGO_URI} = process.env;

var app = express();

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));


mongoose
    .connect(MONGO_URI, { useNewUrlParser : true, useFindAndModify:false})
    .then(()=>{
        console.log('connected to MongoDB')
    })
    .catch(e => {
        console.log(e);
    })

module.exports = app;
