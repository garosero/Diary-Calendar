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
const jwtMiddleware = require('./lib/jwtMiddleware');


app.get('/',(req,res)=>{
    res.send('hello');
})

// setup
app.use(cookieParser);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*
    db connection
*/

const dbConnect = require('./connect/dbConnect');
dbConnect('diary_calendar');

/* JWT 적용  
   라우터 적용 전에 bodyParser가 적용되어야 함.     

*/
app.use(jwtMiddleware);


/* routing */

const expressRouting = require('./routes/index');
expressRouting(app);




module.exports = app;
