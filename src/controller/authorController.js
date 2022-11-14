const authorModel= require('../model/authormodel')

const createAuthor=async function(req,res){
    let author=req.body

    if(!author.fname){
        return res.send({msg:"First Name is mandatory"})
    }
    if(!author.lname){
        return res.send({msg:"Last Name is mandatory"})
    }
    if(!author.title){
        return res.send({msg:"Title is mandatory"})
    }
    if(author.title != ("Mr"|| "Mrs"|| "Miss")){
        return res.send({msg:"Title takes only : Mr, Mrs, Miss"})
    }
    if(!author.email){
        return res.send({msg:"Email Id is mandatory"})
    }
    if(!author.password){
        return res.send({msg:"Password is mandatory"})
    }
    let authorCreated=await authorModel.create(author);
        res.send({data:authorCreated})
};

const getAuthorData=async function(req,res){
let authors=await authorModel.find()
res.send({data:authors})

}
module.exports.createAuthor=createAuthor
module.exports.getAuthorData=getAuthorData
