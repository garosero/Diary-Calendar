const express = require('express');
const multer = require('multer');
const router = express.Router();
const mongoose = require('mongoose');
const Diary = require('../models/diary');
const { User } = require('../models/user');
const fs = require('fs');
const path = require('path');





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

 /**
  *  POST api/diary/image
  *  
  */
 
  const upload = multer({
      storage:multer.diskStorage({
        destination(req,file,cb){
            cb(null,'uploads') //uploads 폴더에 저장하겠다
        },
        filename(req,file,cb){
            const ext = path.extname(file.originalname); //파일의 오리지널 네임에서 확장자만 추출
            const basename = path.basename(file.originalname, ext); //abc.png ext===png, basename===abc
            cb(null,basename+ new Date().valueOf()+ext); //이름 중복 안되도록 시간도 추가(덮어씌워지지않도록) 
        }
      }), //서버쪽 하드에 저장하겠다 (S3나 구글 클라우드 스토리지로 바꿀 수 있음)
      limits:{ fileSize: 20 * 1024 * 1024 }, //20mb 제한 (kb단위) 
    })

    //image를 한 장만 올리고 싶다면 single, none : 이미지나 파일을 하나도 안올림
  router.post('/image',upload.array('images'),(req,res)=>{
    console.log(req.files);
    res.json(req.files.map(v => v.filename));

  })





 module.exports = router;


