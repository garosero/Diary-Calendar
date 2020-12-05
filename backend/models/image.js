const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const imageSchema = new Schema({
    src : {
        data : Buffer, //Buffer allows us to store our image as data in the form of arrays
        contentType : String
    }

})


module.exports = mongoose.model('Image',imageSchema);