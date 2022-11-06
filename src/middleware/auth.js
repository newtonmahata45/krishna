const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const middleware1 = async function (req, res, next) {
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user)
        return res.send({
            status: false,
            msg: "username or the password is not corerct",
        });
    next()
}
const middleware2 = function (req,res,next){
    let token = req.headers["x-auth-token"];
    if (!token) {
        return res.send({ status: false, msg: "x-auth-token  is mandotary in Headers" })
    }
    next()
}
const middleware3 = async function (req,res,next){
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    console.log(userDetails);
    if (!userDetails){
      return res.send({ status: false, msg: "No such user exists with this ID" });
    }
    next()
}

const middleware4 = async function (req,res,next){
    let token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "vasudhaiva");
    console.log(decodedToken);
    if (!decodedToken){
      return res.send({ status: false, msg: "Token is Invalid" });
    }
    next()
}
module.exports.middleware1= middleware1
module.exports.middleware2= middleware2
module.exports.middleware3= middleware3
module.exports.middleware4= middleware4