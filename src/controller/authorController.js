const jwt = require("jsonwebtoken");
const authorModel = require('../model/authormodel.js')

const createAuthor = async function (req, res) {
  let author = req.body
  if(Object.keys(author).length==0) return res.status(400).send({status:false,msg:"data is not present"})
  let fname = req.body.fname
  let lname = req.body.lname
  let title = req.body.title
  let email = req.body.email
  let password = req.body.password

  try {

    if (!fname) {
      return res.status(400).send({ status: false, msg: "First Name is mandatory" })
    }
    if (typeof fname !== "string" || fname.trim().length === 0) {
      return res.status(400).send({ status: false, msg: "fname is not valid" })
    }
    if (!lname) {
      return res.status(400).send({ status: false, msg: "Last Name is mandatory" })
    }
    if (typeof lname !== "string" || lname.trim().length === 0) {
      return res.status(400).send({ status: false, msg: "lname is not valid" })
    }
    if (!title) {
      return res.status(400).send({ status: false, msg: "Title is mandatory" })
    }
    if(!["Mr", "Mrs", "Miss"].includes(title)){
      return res.status(400).send({ status: false, msg: "title is not valid" })}
      
    if (!email) {
      return res.status(400).send({ status: false, msg: "Email Id is mandatory" })
    }

    if (!password) {
      return res.status(400).send({ status: false, msg: "Password is mandatory" })
    }
    if (password.length < 8){return res.status(400).send({status:false,msg:"Password must be at least 8 characters"})}

    function validateEmail(input) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(input);
    }
    if (validateEmail(email) == false) { return res.status(400).send({ status: false, msg:  "email format is invalid"  }) }
    
    let uniqueEmail = await authorModel.find({email:email})    
    if(uniqueEmail[0]){ return res.status(409).send({status:false, msg:"email id Already exists"}) } 
    
    else {
      let authorCreated = await authorModel.create(author);
     return res.status(201).send({ status: true, data: authorCreated })
    }

  } catch (err) {
    return res.status(500).send({ msg: err.message })
  }
};


const loginAuthor = async function (req, res) {
  let emailId = req.body.email;
  let password = req.body.password;
  try {
    if (!(emailId||password)) {
      return res.status(400).send({ status: false, msg: "Email Id and Password are mandatory for login" })
    }

    let author = await authorModel.findOne({ email: emailId, password: password });
    if (!author) {return res.status(404).send({status: false,msg: "Author not found with this EmailId and Password",})}

    let token = jwt.sign(
      {
        authorId: author._id.toString(),
        userName: emailId,
        password: password

      },
      "room-2-secret-key"
    );
    res.setHeader("x-api-key", token);
    return res.status(200).send({ status: true, data: token });
  } catch (Err) {
    return res.status(500).send({ status: false, msg: Err.message });
  }
};

module.exports.createAuthor = createAuthor
module.exports.loginAuthor = loginAuthor