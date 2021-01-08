const express = require('express');
const router = express.Router();
const { google } = require("googleapis");
const passport = require("passport");
const User = require('../models/user');
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const moment = require('moment');

/**
 *  POST /api/calendar/
 *  primary calendar의 현재 달의 이벤트를 가져오는 라우터. 
 * 
 *  response : {
 *    id : event.id,
 *    created : event.created
 *    updated
 *    summary
 *    start : 
 *    end :
 *    creator 
 * }
 */

router.post("/:calendarId/:year/:month", isLoggedIn, function (req, res, next) {
  if(req.user.provider !== 'google'){
    res.status(404).send();
  }
  try{
   var oauth2Client = new google.auth.OAuth2(
     process.env.CLIENT_ID,
     process.env.CLIENT_SECRET,
     process.env.absoluteURI+"/google/callback"
   );

   oauth2Client.setCredentials({
     access_token: req.user.accessToken,
     refresh_token: req.user.refreshToken,
   });

   var calendar = google.calendar({ version: "v3", auth: oauth2Client });
  //  const nowYear = moment().get('year');
  //  const nowMonth = moment().get('month');
  //  console.log('nowMonth : '+moment().startOf('month'));
  //  const endDay = moment().endOf('month');

  const year = req.params.year;
  const month = req.params.month;
  // if(req.params.calendaId)

   calendar.events.list(
     {
       calendarId: req.params.calendarId,
      //  timeMin: new Date().toISOString(),
       timeMin : new Date(year,month,1).toISOString(),
       timeMax : new Date(year,month,31).toISOString(), // 30일까지일 때 request error 나지 않는지 확인 
       maxResults: 10,
       singleEvents: true,
       orderBy: "startTime",
     },
     function (err, response) {
       // process result
       console.log("err : " + err);
       const events = response.data.items;
       res.send(eventsToCustomObj(events))
     }
   );

    }catch(e){
     next(e)
   }
 });

/**
 * POST api/calendar/:calendarId/:year/:month
 * 계정의 선택한 캘린더 종류의 한달간 이벤트를 불러오는 라우터
 * 
 */
 
router.post("/:calendarId/:year/:month", isLoggedIn, function (req, res, next) {
  try {
    var oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.absoluteURI + "/google/callback"
    );

    oauth2Client.setCredentials({
      access_token: req.user.accessToken,
      refresh_token: req.user.refreshToken,
    });

    var calendar = google.calendar({ version: "v3", auth: oauth2Client });
    //  const nowYear = moment().get('year');
    //  const nowMonth = moment().get('month');
    //  console.log('nowMonth : '+moment().startOf('month'));
    //  const endDay = moment().endOf('month');

    const year = req.params.year;
    const month = req.params.month;

    calendar.events.list(
      {
        calendarId: req.params.calendarId,
        //  timeMin: new Date().toISOString(),
        timeMin: new Date(year, month, 1).toISOString(),
        timeMax: new Date(year, month, 31).toISOString(), // 30일까지일 때 request error 나지 않는지 확인
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      },
      function (err, response) {
        // process result
        console.log("err : " + err);
        const events = response.data.items;
        res.send(eventsToCustomObj(events));
      }
    );
  } catch (e) {
    next(e);
  }
});


 /**
  *  POST /api/calendar/calendarList
  * 
  */

 router.post('/calendarList', isLoggedIn, async(req,res,next) => {

   try{
    var oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.absoluteURI + "/google/callback"
    );

    oauth2Client.setCredentials({
      access_token: req.user.accessToken,
      refresh_token: req.user.refreshToken,
    });

    var calendar = google.calendar({ version: "v3", auth: oauth2Client });
 
    var calendarList = await calendar.calendarList.list({ auth : oauth2Client, maxResults : 10})
    
    retObjArray = new Array();
    for(const curItem of calendarList.data.items){
      
        var retObj = {
          _id: curItem.id,
          summary: curItem.summary,
          description: curItem.description,
          timeZone: curItem.timeZone,
          primary: curItem.primary,
        };
        retObjArray.push(retObj);
    }

    res.send(retObjArray);
  }catch(e){
    next(e);
  }
  
  })


eventToCustomObj = (event) => {
  var obj = {
    _id: event.id,
    day: "",
    title: event.summary ? event.summary : "",
    memo: event.description ? event.description : "",
    startTime: event.start.date ? event.start.date : event.start.dateTime,
    endTime: event.end.date ? event.end.date : event.end.dateTime,
    location: event.location ? event.location : "",
    people: event.attendees ? event.attendees : [],
  };
  obj.day = new Date(obj.startTime).getDate();

  return obj;
};

eventsToCustomObj = (events) => {
  var retObjArr = new Array();
  for (var event of events) {
    retObjArr.push(eventToCustomObj(event));
  }
  return retObjArr;
};

module.exports = router;