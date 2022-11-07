const jwt = require("jsonwebtoken");
const mongoose =require("mongoose")
const userModel = require("../models/userModel");
const authenticate = async function (req, res, next) {
  //check the token in request header
  //validate this token
  let userId = req.params.userId;
  let token = req.headers["x-auth-token"]
  let user = await userModel.findById(userId);
  if (!token) {
    return res.send({ status: false, msg: "token must be present" });
  }
  var valid = mongoose.Types.ObjectId.isValid(userId);
  if(!valid)
  {
    
    //process your code here
    res.send("UserID is Invalid")
  }
  if (!user) {
    return res.send("No such user exists");
  }
  try{
  let decodedToken = jwt.verify(token, "functionup-lithium-secret-key");
  console.log(decodedToken)
  }catch(error){
    return res.status(400).send({ status: false, error:error});//status: false, msg: "Token is Invalid" 
  }
  next()
}

const authorise = function (req, res, next) {
  // comapre the logged in user's id and the id in request
  //const decodedToken = req.decodedToken;
  let token = req.headers["x-auth-token"]
  let decodedToken = jwt.verify(token, "functionup-lithium-secret-key");
  let userId = req.params.userId;
  if (decodedToken.userId.toString() != userId) {
    return res.status(403).send({ message: "You are not Authorised" })
  }
  next()
}

module.exports.authenticate = authenticate;
module.exports.authorise = authorise;