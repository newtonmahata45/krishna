const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
try{
  let data = req.body;
  let savedData = await userModel.create(data);
  //console.log(req.newAtribute);
  return res.status(201).send({ msg: savedData });
}catch(err){
  return res.status(400).send({ status: false, error: err.message});
}
}


const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;
try{
  let user = await userModel.findOne({ emailId: userName, password: password });
  // if (!user)
  //   return res.send({
  //     status: false,
  //     msg: "username or the password is not corerct",
  //   });

  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "lithiumm",
      organisation: "FunctionUp",
    },
    "functionup-lithium-secret-key"
  );
  res.setHeader("x-auth-token", token);
  res.status(200).send({ status: true, data: token });
}catch(Err){
  return res.status(400).send({status: false, msg: "username or the password is not corerct",});
  }
};

const getUserData = async function (req, res) {

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);

  res.status(200).send({ status: true, data: userDetails });
  }

const updateUser = async function (req, res) {


  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.status(201).send({ status: true, data: updatedUser });
};

const postMessage = async function (req, res) {
    let message = req.body.message

    //let userToBeModified = req.params.userId
    // //userId for the logged-in user
    // let userLoggedIn = decodedToken.userId

    // //userId comparision to check if the logged-in user is requesting for their own data
    // if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
    let userId = req.params.userId;
    let updatedPosts = []
    //add the message to user's posts
    updatedPosts.push(message)
    let updatedUser = await userModel.findOneAndUpdate({_id: userId},{posts: updatedPosts}, {new: true})

    //return the updated user document
    return res.status(200).send({status: true, data: updatedUser})
}
const deleteUser = async function (req, res) {
  let userId = req.params.userId;
  let deletedUser = await userModel.findOneAndUpdate({ _id: userId }, {$set:{isDeleted:true}},{new:true});
  res.status(200).send({ status: "Deleted", data: deletedUser });
};


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.postMessage = postMessage;
module.exports.deleteUser = deleteUser
