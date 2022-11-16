const authorModel= require('../model/authormodel')

const createAuthor=async function(req,res){
    let author=req.body
    let fname = req.body.fname
    let lname = req.body.lname
    let title = req.body.title
    let email = req.body.email
    let password = req.body.password

try{
    if(!fname){
        return res.status(400).send({msg:"First Name is mandatory"})
    }
    if(!lname){
        return res.status(400).send({msg:"Last Name is mandatory"})
    }
    if(!title){
        return res.status(400).send({msg:"Title is mandatory"})
    }
    if(!email){
        return res.status(400).send({msg:"Email Id is mandatory"})
    }
    
    if(!password){
        return res.status(400).send({msg:"Password is mandatory"})
    }
    if (title!=("Mr" || "Mrs" || "Miss")){
        return res.status(400).send({msg:"title takes only: Mr, Mrs or Miss "})
    }
    function validateEmail(input) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return re.test(input);
          }
        if (validateEmail(email) == false) {return res.send({ msg: "email format is invalid", status: false })}
          else{
    
        let authorCreated=await authorModel.create(author);
        res.status(201).send({status:true,data:authorCreated})}
}catch(err){
    return res.status(500).send({ msg: err })
}
};
const loginAuthor = async function (req, res) {
    let emailId = req.body.email;
    let password = req.body.password;
  try{
    let author = await authorModel.findOne({ email: emailId, password: password });
    if (!author)
      return res.send({
        status: false,
        msg: "Email Id or the Password is not corerct",
      });
  
    let token = jwt.sign(
      {
        authorId: author._id.toString(),
        batch: "lithiumm",
        organisation: "FunctionUp",
      },
      "functionup-lithium-secret-key"
    );
    //res.setHeader("x-auth-token", token);
    res.status(200).send({ status: true, data: token });
  }catch(Err){
    return res.status(500).send({status: false, msg: Err.message});
    }
  };

module.exports.createAuthor=createAuthor
module.exports.loginAuthor = loginAuthor
// module.exports.getAuthorData=getAuthorData
