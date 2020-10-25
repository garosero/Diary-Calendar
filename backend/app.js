var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const { PORT, MONGO_URI } = process.env;
var app = express();


app.get('/',(req,res)=>{
    res.send('hello');
})

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());


/*
    db connection
*/

const dbConnect = require('./connect/dbConnect');
dbConnect('diary_calendar');


/* routing */

const expressRouting = require('./routes/index');
expressRouting(app);


module.exports = app;
