const express = require('express');
const multer = require('multer');
const router = express.Router();
const mongoose = require('mongoose');
const Diary = require('../models/diary');
const { User, db } = require('../models/user');
const Image = require('../models/image');
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

// router.get('/', async(req,res,next) => {
//     try {
//         res.send("haha");

//     } catch(error){
//         next(error);
//     }
// })


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
  *  이미지 업로드
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
            console.log(basename + new Date().valueOf() + ext);
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

  /**
   *  POST /api/diary/post
   *  이미지가 없으므로 none()을 사용 
   *  폼데이터 파일->req.file(s)
   *  폼데이터 일반 값->req.body
   */
  router.post('/post',upload.none(),async(req,res)=>{
    try {
        console.log("user : "+req.user);
        //const fileNameArr = req.files.map(v=>v.filename);

        const newDiary = await Diary.create({
            content : req.body.content,
            calendarDate : req.body.calendarDate,
            userId : req.user.userId,
            img : req.body.image,
        });
       
        await newDiary.save();
        res.json({success : 'OK'});
    } catch (error) {
        console.log(error);
    }
  })


  /**
   *  GET  /api/diary/:diaryId
   */

   router.get('/:calendarDate', async(req,res,next) => {
       try{
         const diary = await Diary.findOne({
             userId : req.user.userId,
             calendarDate : req.params.calendarDate
         });
         if(!diary){
             return res.status(404).send('해당 날짜의 다이어리가 존재하지 않습니다.')
         }
         res.status(200).json(diary);
       }catch(e){
        console.log(error);
        next(error);
       }
   })

 





 module.exports = router;


