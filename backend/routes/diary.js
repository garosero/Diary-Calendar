const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Diary = require('../models/diary');


/** 
 * POST /api/diary
 * 
 * title(String)
 * body(String)
 * tags(String)

    publishedDate : {
        type : Date,
        default: Date.now, //현재 날짜를 기본값으로 지정 
    } 
    
*/

router.get('/', async(req,res,next) => {
    try {
        res.send("haha");

    } catch(error){
        next(error);
    }
})


 router.post('/', async(req,res,next) => {

    try {
        console.log("AA");

        const newDiary = new Diary({
            title : req.body.title,
            body : req.body.body,
            tags : req.body.tags,
            publishedDate : req.body.publishedDate
            
        });

        const saveDiary = await newDiary.save().catch(error => {
            console.log(error);
            throw error;
        })

        return res.json(saveDiary);

    }catch(error){
        next(error);
    }
 });




 module.exports = router;


