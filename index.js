const express = require('express'); 
const path = require('path');
const port = process.env.PORT || 3000; 
const app = express(); 
// server.js가 있는 디렉토리로 설정해준다. 

if(process.env.NODE_ENV === "production"){

    app.use(express.static(path.join(__dirname, "frontend/dist")));

    app.get('*', (req,res) =>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    })
}

const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`Server Running at ${port}`);
})