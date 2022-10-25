let mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    bookName:{
        type : String,
        unique: true,
        required : true,
    },
    authorName:{
        type : String,
        required: true,

    },
    catagory :String,
    year: Number
},{ timestamps: true });


module.exports = mongoose.model("Bookdata",bookSchema)