const express = require('express'); 
const path = require('path');
const port = process.env.PORT || 3000; 
const app = express(); 
// server.js가 있는 디렉토리로 설정해준다. 

//이 패스가 프로젝트의 루트로 취급된다.
app.use(express.static(path.join(__dirname,"/dist"))); 

app.get('*', (req, res) => { 
    res.sendFile(path.resolve(__dirname, 'dist','index.html')); });
app.listen(port,function(){
    console.log('express server listening on port : '+port)
});


//heroku 배포를 위한 express 서버
