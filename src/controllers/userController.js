const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

/*
  Read all the comments multiple times to understand why we are doing what we are doing in login api and getUserData api
*/
const createUser = async function (req,res ) {
  let data = req.body;
  let savedData = await userModel.create(data);

  res.send({ msg: savedData });
};

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  // if (!user)
  //   return res.send({
  //     status: false,
  //     msg: "username or the password is not corerct",
  //   });

  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "lithium",
      organisation: "FunctionUp",
    },
    "vasudhaiva"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};

const getUserData = async function (req, res) {
  // let token = req.headers["x-auth-token"];
  // if (!token){
  //  return res.send({status: false, msg: "x-auth-token  is mandotary in Headers"})
  // }
//  console.log(token);

//   let decodedToken = jwt.verify(token, "vasudhaiva");
//   console.log(decodedToken);
//   if (!decodedToken){
//     return res.send({ status: false, msg: "Token is Invalid" });
//   }
  let userId = req.params.userId;
  let userDetails = await userModel.findById( userId);
  // if (!userDetails){
  //   return res.send({ status: false, msg: "No such user exists with this ID" });
  // }
  
  return res.send({ status: true, data: userDetails });
  // Note: Try to see what happens if we change the secret while decoding the token
  
};

const updateUser = async function (req, res) {

  // let token = req.headers["x-auth-token"];
  // if (!token){
  //  return res.sand({status: false, msg: "x-auth-token  is mandotary in Headers"})
  // }
  let userId = req.params.userId;
  // let user = await userModel.findById(userId);

  // if (!user) {
  //   return res.send("No such user exists with this ID");
  // }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData,{new:true});
  res.send({ status: "Updated", data: updatedUser });
};
const deleteUser = async function (req, res) {
  let userId = req.params.userId;
  let deletedUser = await userModel.findOneAndUpdate({ _id: userId }, {$set:{isDeleted:true}},{new:true});
  res.send({ status: "Deleted", data: deletedUser });
};

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;