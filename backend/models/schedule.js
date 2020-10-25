import mongoose from 'mongoose';

const ScheduleSchema = mongoose.Schema;

/**
 * title : 일정 이름
 * day : 일정 날짜
 * hour : 알람 시 
 * minute : 알람분
 * ampm : 오전/오후
 */

 const ScheduleSchema = new Schema({
     title : String,
     day : Date,
     hour : Number,
     minute : Number,
     ampm : String
 })