const jwt = require('jsonwebtoken');
const User = require('../models/user');

/* client의 cookie에서 access_token을 읽는다.
 * jwt.verify 함수에서 암호화된 JWT의 payload를 decoded 변수에 저장.
 * payload엔 user의 정보(id 등)가 저장되어 있으므로, 그 id로 DB를 조회. 
 */

const jwtMiddleware = async(req,res,next) => {
    console.log(req.body);
    const token = req.cookies['access_token'];
    if(!token){
        console.log("No token");
        return next(); //토큰이 없음
    }
    else console.log("middle token : "+token);
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const reqBody = JSON.parse(JSON.stringify(req.body));
        console.log('reqBody : '+reqBody);
        console.log('decoded : '+decoded._id);
        req.body = {
            _id : decoded._id,
            userId : decoded.userId, //왜 decoded.userId를 하면 abcd로 되어있을까???? reqBody로 하면 됨 -- decoded._id가 겹치는 경우가 있음 근데 _id가 겹치는거지 왜 userId로 했는데 안되냐고 
            password : reqBody.password,
        }
        //성공했을 때 이전의 middle Token이 그대로 남아있어서 middletoken의 id가 abc이면 abc로 들어감 지금 회원가입한 id는 ttt여도... 
        //회원가입과 로그인의 middleWare적용이 달라야하는듯?

        //_id, userId만 설정하여 보낸 request data에서 password가 사라져 undefined가 되어버림
        //미리 저장해놨다가 새로 수정한 req.body에 넣어줘야함. 
        
        //토큰의 남은 유효 기간이 3.5일 미만이면 재발금
        const now = Math.floor(Date.now() / 1000);
        if(decoded.exp - now < 60 * 60 * 24 * 3.5){
            const user = await User.findById(decoded._id);
            const token = user.generateToken();
            res.cookie('access_token', token, {
                maxAge : 1000 * 60 * 60 * 24 * 7,
                httpOnly : true,
            });
        }

        return next();
    } catch(e){
        //토큰 검증 실패
        console.log(e);
    }
}

module.exports = jwtMiddleware;         