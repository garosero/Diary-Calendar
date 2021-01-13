const local = require('./local');
const google = require('./google');
const passport = require('passport');
const User= require('../models/user');

/**
 * 서버쪽에서 일어나는 회원 정보를 저장하는 방법 (로그인 정보)
 * 가벼운 객체로 바꿔서 서버쪽 메모리 부담을 최소화
 * (passport 뿐만 아니라 다른 것도)
 */

module.exports = () => {
    passport.serializeUser((user, done) => {   //req.session 객체에 어떤 데이터를 저장할 지 선택 (req.session.passport.user에)
       console.log('serialize');
       done(null, user.userId);
    });

    passport.deserializeUser(async(userId, done) => { //3번 id를 가져와서 다시 유저 정보 가져오기 (그냥 3번이란는 id만으론 아무것도 못하니까)
        try{
            console.log('deserialize');
            const user = await User.findByUserId(userId);
            return done(null,user)
        } catch(e){
            return done(e); //req.user에 저장
        }
    });

    local();
    google();
}

