var express = require('express');
var app = express();
const cors = require('cors')
var path = require('path');
const morgan = require('morgan');
const session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config(); //dotenv 패키지가 env 파일을 읽어줌
const mongoose = require('mongoose');
const passport = require("passport");




const passportConfig = require("./passport");
passportConfig();



// Middleware setup
app.use(cors());
app.use('/',express.static(path.join(__dirname,'uploads'))); //'/' : front에서 접근하는 주소 //static : 해당 경로의 파일들을 다른 서버에서 가져갈 수 있게 해주는 역할
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(logger('dev'));

app.use('/api',express.json());
app.use('/api',express.urlencoded({ extended: false }));

// let corsOptions = {
//     origin : 'http://localhost:3000',
//     credentials : true
// }


app.use(session({
    resave : false,
    saveUninitialized : false,
    name : 'SID',
    unset:'destroy',
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
        maxAge : 1000*60*60*1,
    }
}));

app.use(passport.initialize()); //req 객체에 passport 설정 심기
app.use(passport.session()); //req.session 객체에 passport 정보 저장
//expressSession 아래에 써야함. passport.session이 expressSession을 사용하므로 

// Serve static assets if in production



/*
    db connection
*/

const dbConnect = require('./connect/dbConnect');
dbConnect();



/* routing */



const expressRouting = require('./routes/index');
expressRouting(app);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/dist"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    console.log("send");
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    //next()없으면 아예 google account 창으로 안넘어가짐
  });
}





module.exports = app;
