const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../models/user');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');


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
    //local.js에서 done(1,2,3)의 1,2,3 받아옴
    if(err){
      //next하면 서버 에러가 일어났을 때 알아서 처리해줌
      console.error(err);
      next(err);
    };
    if(info){
      return res.status(401).send(info.reason);
    };
    return req.login(user, (loginErr) => {
      console.log("login 됐나");
      if(loginErr){
        return next(loginErr);
      }
      console.log('세션 확인 : '+req.session.passport.user);   //일단 로그인에선 저장됐음!! 여기에 
      console.log("req.user 저장 확인 : "+req.user); //req.user에 저장됨 !!
      const filteredUser = Object.assign({},req.user._doc);
      delete filteredUser.password; //password를 보내는 건 위험하니까 삭제
      console.log(filteredUser);
      return res.json(filteredUser); //프론트에 사용자 정보를 보내주기
      //
    })
 })(req,res,next); //<-- 이거 안써서 그런거엿냐???
});
//local 파일 --> 여기서 authenticate로 정보 프론트에 보내줌 
//req.login하면 passport.serializeUser가 실행된다 . 로그인한 사용자 정보의 아이디와 쿠키만
//간직하고 있다가 이제 프론트에서 cookie(asdfgh) 보내주면 deserializeUser 해서 정보 가져오는 거 


//프론트에서 서버로는 cookie만 보내줌
//서버가 쿠키를 파서 익스프레스 세션으로 쿠키 검사 후 id:3 발견
//id : 3이 deserializeUser에 들어감
//req.user로 사용자 정보가 들어감 

//쿠키는 httpOnly, secure 둘 다 true면 털릴 일 거의 없음
//https를 쓸 때 secure : true로 함 


//요청 보낼때마다 deserializeUser가 실행됨
//실무에서는 deserializeUser 결과를 캐싱 (db요청 1번 실행 - 한 번 찾은 유저는 다시 찾지 않도록)
//db작업이 비용이 제일 많이 든다. 
router.post('/logout',isLoggedIn,(req,res)=>{
  req.logout();
  req.session.destroy();
  res.clearCookie('connect.sid',{path : '/'}).status(200).send('OK');
  console.log("로그아웃 후  :" + req.user);
});


/**
 *  google oauth 로그인
 *  GET /api/user/google
 */

 router.get('/google', passport.authenticate('google', { scope : ['profile']}));
 router.get('/google/callback', passport.authenticate('google', {
      failureRedirect : '/',
      failureFlash :'Invalid Google credentials.'
    }), (req,res)=>{
   // res.send(JSON.stringify(req.user));
    res.redirect('http://localhost:3000/');
 })


/**
 *  /api/user/check
 *   유저가 로그인 되어있는지 체크
 */

router.get('/check', async(req,res,next)=>{   //req.user가 없음 !!! ㅠㅠㅠ 
  console.log(req.session);
  try{
    if(req.user){
      console.log('있다');
      // const findUser = await User.findOne(
      //   { userId: req.user.userId }
      // );
      const logedUser = Object.assign({}, req.user._doc);
      delete logedUser.password;
      res.status(200).json(logedUser);
    }else{
      console.log('없다');
      res.status(200).json(null);
    }

  }catch(e){
    console.log("에러");
    console.error(e);
    next(e);
  }
})


module.exports = router;