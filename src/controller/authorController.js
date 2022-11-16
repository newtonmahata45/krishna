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
        return res.send({msg:"First Name is mandatory"})
    }
    if(!lname){
        return res.send({msg:"Last Name is mandatory"})
    }
    if(!title){
        return res.send({msg:"Title is mandatory"})
    }
    // if(title !== ("Mr"|| "Mrs"|| "Miss")){
    //     return res.send({msg:"Title takes only : Mr, Mrs, Miss"})
    // }
    if(!email){
        return res.send({msg:"Email Id is mandatory"})
    }
    
    if(!password){
        return res.send({msg:"Password is mandatory"})
    }
    function validateEmail(input) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return re.test(input);
          }
        // console.log(validateEmail(email))
        if (validateEmail(email) == false) {return res.send({ msg: "email format is invalid", status: false })}
          else{
    
        let authorCreated=await authorModel.create(author);
        res.status(201).send({data:authorCreated})}
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
    return res.status(500).send({status: false, msg: Err});
    }
  };

module.exports.createAuthor=createAuthor
module.exports.loginAuthor = loginAuthor
