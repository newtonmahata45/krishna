const authorModel= require('../model/authormodel')

const createAuthor=async function(req,res){
    let author=req.body
    let authorCreated=await authorModel.create(author);
        res.send({data:authorCreated})
};

const getAuthorData=async function(req,res){
let authors=await authormodel.find()
res.send({data:authors})

 }
module.exports.createAuthor=createAuthor
module.exports.getAuthorData=getAuthorData
