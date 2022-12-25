const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    firstName :String,
    lastName : String,
    mobileNumber : {type :  String , required : true, unique : true},
    DOB :  Date,
    emailID  : {type :  String , required : true, unique : true},
    address :  String,
    customerID :  String,
    status :  { type :String , default : 'ACTIVE'}
},{timestamps : true})

module.exports = mongoose.model("Customer", customerSchema)