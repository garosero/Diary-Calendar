const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require('joi'); //클래스 반환 
const User = require("../models/user");


router.post("/", async(req,res)=>{
    console.log("BD");
})


/**
 * 회원가입 
 * FIX : Joi validation이 기능을 안함. 그냥 무조건 success : true로 응답... 
 */
router.post('/register', async(req,res)=>{
    console.log("AA");

    //request body 검증
    const schema = Joi.object({
        userId : Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),
        password : Joi.string().required(),
    });
    const result = schema.validate({
        userId : req.body.userId,
        password : req.body.password
    }); //body와 schema 비교하여 조건 맞는지 검증
    if(result.error){
        return res.status(400).send(`Register Error : ${result.error}`);
    }

    const {userId, password } = req.body;
    console.log('auth : '+req.body);
    try {
        const exists = await User.findByUserId(userId);
        if(exists) {
            
            //id가 이미 존재하면 회원가입 불가 
            return res.status(400).send('id is already registered');
        }
        console.log(exists);
        const newUser = new User({
            userId,
        });
        await newUser.setPassword(password); //비밀번호 설정
        await newUser.save((err,userInfo) => {
            //db에 비밀번호와 함꼐 저장 
            if(err) return res.json({success : false, err});
            //return res.status(200).json({ success : true});
    }); 
    
        const token = newUser.generateToken();
        res.cookie('access_token', token, {
            maxAge : 1000 * 60 * 60 * 24 * 7, //7일
            httpOnly : true, //자바스크립트 통해서 쿠키 조회 불가 
        }).status(200).json({
            success : true
        })

        // res.status(200).json({
        //     success : true
        // });


    } catch(err){
        console.log('여기에러' +err);
    }

})


/**
 * POST  /api/auth/login
 * 로그인 
 */
router.post('/login', async(req,res)=>{
    
    console.log(req.body);
    const { userId, password } = req.body;

    console.log("id : "+userId+" password : "+password);
    //없으면 에러처리
    if(!userId || !password){
        res.status(401).json({
            message : '아이디나 비밀번호가 없습니다.'
        })
    };

    try{
        const user = await User.findByUserId(userId);
        //계정이 존재하지 않으면 에러

        if(!user){
            return res.status(401).send('존재하지 않는 계정')
        };
        const valid = await user.checkPassword(password);
        //잘못된 비밀번호
        if(!valid){
            console.log(password);
            return res.status(401).json({
                message : '잘못된 비밀번호입니다.'
            })
        }
        const token = user.generateToken();
        console.log("token : "+token);
        res.cookie("access_token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, //7일
            httpOnly: true, //자바스크립트 통해서 쿠키 조회 불가
        }).status(200).json({
            loginSuccess : true
        })



        //return res.json({loginSuccess : true});
        
    } catch(e){
        console.log(e);
    }


})


/** 
 *  로그아웃
 *  쿠키를 지워준다. 
 */

router.post('/logout', (req,res)=>{
    res.clearCookie('access_token'); //access_token을 아예 삭제해야 회원가입 에러가 나지않음.
    res.status(204).send('remove cookie'); 
})

/**
 *  GET /api/auth/check
*/

router.get('/check', async(req,res)=>{

    const { user } = req.body;
    if(!user){
        //로그인중이 아님
        res.status(401).send('Unauthorized'); // Unauthorized
        return;
    }

    req.body = user;
})




 

module.exports = router;