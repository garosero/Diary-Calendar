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
    //서버쪽에 [{id : 3, cookie : 'asdfgh'}]  프론트에서 asdfgh를 보내면 3번 유저구나 알아차림 이게 serialize 작업
    passport.serializeUser((user, done) => {   //req.session 객체에 어떤 데이터를 저장할 지 선택 (req.session.passport.user에)
       console.log('serialize');
       done(null, user.userId);
    });

    passport.deserializeUser(async(userId, done) => { //3번 id를 가져와서 다시 유저 정보 가져오기 (그냥 3번이란는 id만으론 아무것도 못하니까)
    
            console.log('deserialize');
            const user = await User.findByUserId(userId);
            done(null,user); //req.user에 저장
        
    });

    local();
    google();
}


//90% 웹사이트는 쿠키 - 세션 이요하는게 맞고
//jwt 쓸려면 엄청 요청 많이 쓰거나 엄청 대규모 웹사이트여야
//잘못하면 손해 많이 봄. 
//쿠키도 사실 토큰 기반임. 