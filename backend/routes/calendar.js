const express = require('express');
const router = express.Router();
const { google } = require("googleapis");
const passport = require("passport");
const User = require('../models/user');
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

/**
 *  POST /api/calendar/
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

router.post("/", isLoggedIn, function (req, res) {
   var oauth2Client = new google.auth.OAuth2(
     process.env.CLIENT_ID,
     process.env.CLIENT_SECRET,
     "http://localhost:4000/google/callback"
   );

   oauth2Client.setCredentials({
     access_token: req.user.accessToken,
     refresh_token: req.user.refreshToken,
   });

   var calendar = google.calendar({ version: "v3", auth: oauth2Client });
   var resObj = [];
   calendar.events.list(
     {
       calendarId: "primary",
       timeMin: new Date().toISOString(),
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
   //뭐지 안되다가 갑자기 됐는데 invalid request ... db 저장된 토큰이 만료됐던건가?
 });


 /**
  *  POST /api/calendar/calendarList
  * 
  */

 router.post('/calendarList', isLoggedIn, async(req,res) => {
    var oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "http://localhost:4000/google/callback"
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