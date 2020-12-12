const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

/**
 * 로그인 전략 
 */

 //함수 모듈이므로 밖에서 실행되어야 함. 
 module.exports = () => {
     passport.use(new LocalStrategy({
         usernameField : 'userId',
         passwordField : 'password',
     }, async( userId, password, done) => {
         console.log("userId "+userId);
         try {
            const user = await User.findByUserId(userId);
            if(!user){
                return done(null, false, { reason : '존재하지 않는 사용자입니다.'})
                //첫번째 인수 : 서버쪽 에러(에러가 나면 첫번째 인수에 1을 넣어줌)
                //두번째 : 성공했을 때
                //세번째 : 로직 상에서 에러가 났을 때 세번째 인자 사용
            }
            const result = await bcrypt.compare(password, user.password); //password가 일치한다면 user를 넘겨줌
            if(result){
                return done(null, user); //사용자 정보를 두번째 인수로 넘겨줌
            }
            return done(null,false, {reason : '비밀번호가 틀립니다.'});
         }catch(e){
            console.error(e);
            return done(e);
         }
     }
     ))
 }