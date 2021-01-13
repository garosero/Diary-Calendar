const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var path = require("path");
const passport = require('passport');
const { google } = require("googleapis");
const User = require('../models/user');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
// const google = require('../passport/google');


/**  회원가입
 * 
 */
router.post('/signup', async(req,res,next) => {
  try{
    const exUser = await User.findOne({
      where : { userId : req.body.userId,}
    });
    if(exUser){
      return res.status(403).send('이미 사용중인 ID 입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      userId : req.body.userId,
      username : req.body.username,
      password : hashedPassword,
    })
    res.status(201).send('회원가입 성공');
  }catch(e){
    console.error(e);
    next(e); //status 500 
  }

})

router.post('/login',isNotLoggedIn, (req,res,next) => { // /api/user/login
  passport.authenticate('local', (err,user, info) => {
  
    if(err){
      console.error(err);
      next(err);
    };
    if(info){
      return res.status(401).send(info.reason);
    };
    return req.login(user, (loginErr) => {
      if(loginErr){
        return next(loginErr);
      }
      const filteredUser = Object.assign({},req.user._doc);
      delete filteredUser.password; //password를 보내는 건 위험하니까 삭제
      return res.json(filteredUser); //프론트에 사용자 정보를 보내주기
      //
    })
 })(req,res,next); 
});

router.post('/logout',isLoggedIn,(req,res)=>{
  req.logout();
  req.session.destroy();
  res.clearCookie('connect.sid',{path : '/'}).status(200).send('OK');
});


/**
 *  google oauth 로그인
 *  GET /api/user/google
 */

 

 router.get(
   "/google",
   passport.authenticate("google", {
     scope: [
       "profile",
       "https://www.googleapis.com/auth/calendar",
       "https://www.googleapis.com/auth/calendar.events",
     ]
   })
 );

 router.get(
   "/google/callback",
   passport.authenticate("google"),
   (req, res) => {
     // res.send(JSON.stringify(req.user));
     console.log("success");
    return res.redirect("/");
    
   }
 );


/**
 *  /api/user/check
 *   유저가 로그인 되어있는지 체크
 */

router.get('/check', async(req,res,next)=>{   //req.user가 없음 !!! ㅠㅠㅠ 
  console.log(req.session);
  try{
    if(req.user){
  
    
      const logedUser = Object.assign({}, req.user._doc);
      delete logedUser.password;
      res.status(200).json(logedUser);
    }else{
    
      res.status(200).json(null);
    }
    return;

  }catch(e){

    console.error(e);
    next(e);
  }
})


module.exports = router;