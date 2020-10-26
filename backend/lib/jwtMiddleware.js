const jwt = require('jsonwebtoken');

const jwtMiddleware = (req,res,next) => {
    const token = req.cookies.get('access_token'); //cookieParser
    if(!token) return next(); //토큰이 없음
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        return next();
    } catch(e){
        //토큰 검증 실패
        next();
    }
}

module.exports = jwtMiddleware;         