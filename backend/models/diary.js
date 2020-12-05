const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * title : 제목
 * body : 내용
 * tags : 태그 목록
 * publishedDate : 작성 날짜 
 */

const DiarySchema = new Schema({
    content : String,
    publishedDate : {
        type : Date,
        default : Date.now
    },
    userId : {
        type : String,
        required : true,
    },
    img : [{
        type : String,
    }],
    calendarDate : {
        type : String,
        required: true,
    }
   
})


module.exports = mongoose.model('Diary',DiarySchema);

