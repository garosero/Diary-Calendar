const jwt = require('jsonwebtoken');
const User = require('../models/user');

/* client의 cookie에서 access_token을 읽는다.
 * jwt.verify 함수에서 암호화된 JWT의 payload를 decoded 변수에 저장.
 * payload엔 user의 정보(id 등)가 저장되어 있으므로, 그 id로 DB를 조회. 
 */

const jwtMiddleware = async(req,res,next) => {
    const token = req.cookies['access_token'];
    if(!token){
        console.log("No token");
        return next(); //토큰이 없음
    }
    else console.log("token : "+token);
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const reqBody = req.body;
        req.body = {
            _id : decoded._id,
            userId : decoded.userId,
            password : reqBody.password,
        }
        //_id, userId만 설정하여 보낸 request data에서 password가 사라져 undefined가 되어버림
        //미리 저장해놨다가 새로 수정한 req.body에 넣어줘야함. 
        
        //토큰의 남은 유효 기간이 3.5일 미만이면 재발금
        const now = Math.floor(Date.now() / 1000);
        if(decoded.exp - now < 60 * 60 * 24 * 3.5){
            const user = await User.findById(decoded._id);
            const token = user.generateToken();
            req.cookies.set('access_token', token, {
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