const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const blogModel = require("../model/blogModel");

const authenticate = async function (req, res, next) {
  try {
  let token = req.headers["x-api-key"]
  if (!token) {
      return res.status(400).send({ status: false, msg: "token must be present" });
  }

  let decodedToken = jwt.verify(token, "room-2-secret-key");
  if(!decodedToken){return res.status(401).send({status:false,msg:"Authontication faild"})}
  if (decodedToken) {
    next()
    }

  } catch (error) {
    return res.status(400).send({ status: false, error: error.message });
  }

}


const authorise = async function (req, res, next) {

    try{
    let token = req.headers["x-api-key"]
    let decodedToken = jwt.verify(token, "room-2-secret-key");
    

    let blogId = req.params.blogId;

    let blog = await blogModel.findById(blogId);

    var valid = mongoose.Types.ObjectId.isValid(blogId);
    if (!valid) {
        return res.status(400).send({ msg: "Blog Id is Invalid" })
    }
    
    if (!blog) {
        return res.status(404).send({ msg: "No blog available with this Id" })
    }

    if(blog.authorId){
        if (decodedToken.authorId.toString() != blog.authorId) {
        return res.status(403).send({ message: "You are not Authorised" })
        }
    }
    next()
}catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }

  }
module.exports.authenticate = authenticate
module.exports.authorise = authorise