const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 *  userId(String)          : 유저의 가입한 id 
 *  username(String)        : 유저의 이름(google -> displayName)
 *  password(String)        : 유저의 가입한 password ( social 로그인일 경우 password X)
 *  provider(String)        : sns 가입 회원인지 local인지 구분해주는 식별자
 *  accessToken             : OAuth로 발급받은 accessToken 
 *  refreshToken            : OAuth로 발급받은 refreshToekn
 */


const UserSchema = new Schema({
    userId : {
        type : String,
        required : true,
        unique : true,
    },
    username : String,
    password : String,
    provider : {
        type : String,
        default : 'local',
    },
    accessToken : String,
    refreshToken : String,
});

//비밀번호를 파라미터로 받아 계정의 password 값을 설정
UserSchema.methods.setPassword = async function(password){
    const hash = await bcrypt.hash(password, 10); //암호화 
    this.hashedPassword = hash;
}

//파라미터로 받은 비밀번호가 해당 계정의 비밀번호와 일치하는지 검증 
//router에서 구현할 callback
UserSchema.methods.checkPassword = async function(password){
    const result = await bcrypt.compare(password, this.hashedPassword)
    return result; //true / false
}

UserSchema.statics.findByUserId = function(userId){
    return this.findOne({userId});
}

//password 필드가 응답되지 않도록 
//데이터를 JSON으로 변환후 delete를 통해 해당 필드 지우기
UserSchema.methods.serialize = function(){
    const data = this.toJSON();
    delete data.password;
    return data;
}

UserSchema.methods.generateToken = function(){
    const token = jwt.sign(
        //첫번재 파라미터에는 토큰 안에 집어넣고 싶은 데이터를 넣는다.
        {
            _id : this.id,
            userId : this.userId,
        },
        process.env.JWT_SECRET, //두번째 파라미터에는 JWT 암호를 넣는다.
        {
            expiresIn: '1d', //7일동안 유효
        },
    );
    return token;
};





module.exports = mongoose.model('User',UserSchema);