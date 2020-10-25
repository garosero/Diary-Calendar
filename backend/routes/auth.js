const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require('joi'); //클래스 반환 
const User = require("../models/user");


/**
 * 회원가입 
 * FIX : Joi validation이 기능을 안함. 그냥 무조건 success : true로 응답... 
 */
router.post('/register', async(req,res)=>{

    //request body 검증
    const schema = {
        userId : Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),
        password : Joi.string().alphanum().required(),
    };
    const result = Joi.validate(req.body, schema); //body와 schema 비교하여 조건 맞는지 검증
    if(result.error){
        return res.status(400).send(`Login Error : ${result.error}`);
    }

    const {userId, password } = req.body;
    try {
        const exists = await User.findById(userId);
        if(exists) {
            //id가 이미 존재하면 회원가입 불가 
            return res.status(400).send('id is already registered');
        }

        const newUser = new User(req.body);
        await newUser.setPassword(password); //비밀번호 설정
        await newUser.save((err,userInfo) => {
            if(err) return res.json({success : false, err});
            return res.status(200).json({ success : true});
    }); //db에 저장
    

    } catch(err){
        throw(err);
    }

})


/**
 * 로그인 
 */




 

module.exports = router;