var express = require('express');
var app = express();
var path = require('path');
const morgan = require('morgan');
const session = require('express-session');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config(); //dotenv 패키지가 env 파일을 읽어줌
const mongoose = require('mongoose');
const { PORT, MONGO_URI } = process.env;
const passport = require("passport");
const passportConfig = require('./passport');




app.get('/',(req,res)=>{
    res.send('hello');
})

passportConfig();

// Middleware setup
app.use(cookieParser());
app.use(logger('dev'));
app.use('/api',express.json());
app.use('/api',express.urlencoded({ extended: false }));


app.use(session({
    resave : true,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
    },
}));

app.use(passport.initialize()); //req 객체에 passport 설정 심기
app.use(passport.session()); //req.session 객체에 passport 정보 저장
//expressSession 아래에 써야함. passport.session이 expressSession을 사용하므로 


/*
    db connection
*/

const dbConnect = require('./connect/dbConnect');
dbConnect('diary_calendar');



/* routing */

const expressRouting = require('./routes/index');
expressRouting(app);




module.exports = app;
