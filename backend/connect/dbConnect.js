var mongoose = require('mongoose');


/*

    MongoDB 에 연결해주는 커스텀 DB 커넥션 모듈

*/
module.exports = () => {
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function () {
        /* MongoDB 와 연결됨. */
        console.log("Connected to MongoDB server  " );
    });
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser : true, useUnifiedTopology : true });
    // mongoose.connect('mongodb://169.56.98.117/' + dbName, {useFindAndModify: false});

    mongoose.set("useFindAndModify", false);
}



// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
//   .then(() => {
//     console.log("connected to MongoDB");
//   })
//   .catch((e) => {
//     console.log(e);
//   });

  

