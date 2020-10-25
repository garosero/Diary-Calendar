
module.exports = (app) => {

  
 /*
  회원가입 
 */
  const authAPI = require('./auth');
  app.use('/api/auth',authAPI);


  var diaryAPI = require("./diary");
  app.use("/api/diary", diaryAPI);
}