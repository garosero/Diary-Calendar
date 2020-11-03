const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * title : 제목
 * body : 내용
 * tags : 태그 목록
 * publishedDate : 작성 날짜 
 */

const DiarySchema = new Schema({
    title : String,
    body : String,
    tags : [String],
    publishedDate : {
        type : Date,
        default : Date.now
    },
    user : {
        _id : mongoose.Types.ObjectId,
        userId : String,
    },
   
})

module.exports = mongoose.model('Diary',DiarySchema);

