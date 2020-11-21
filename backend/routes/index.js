
module.exports = (app) => {

  
 /*
  회원가입 
 */
  const authAPI = require('./auth');
  app.use('/api/auth',authAPI);

  const userAPI = require('./user');
  app.use('/api/user',userAPI);


  var diaryAPI = require("./diary");
  app.use("/api/diary", diaryAPI);
}