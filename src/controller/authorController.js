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
        res.send({data:authorCreated})}
}catch(err){
    return res.status(500).send({ msg: err })
}
};

const getAuthorData=async function(req,res){
let authors=await authorModel.find()
res.send({data:authors})

}
module.exports.createAuthor=createAuthor
module.exports.getAuthorData=getAuthorData
