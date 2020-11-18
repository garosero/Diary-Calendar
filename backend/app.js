var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const { PORT, MONGO_URI } = process.env;
var app = express();
const jwtMiddleware = require('./lib/jwtMiddleware');


app.get('/',(req,res)=>{
    res.send('hello');
})

// Middleware setup
app.use(cookieParser());
app.use(logger('dev'));
app.use('/api',express.json());
app.use('/api',express.urlencoded({ extended: false }));
app.use(jwtMiddleware);




/*
    db connection
*/

const dbConnect = require('./connect/dbConnect');
dbConnect('diary_calendar');



/* routing */

const expressRouting = require('./routes/index');
expressRouting(app);




module.exports = app;
