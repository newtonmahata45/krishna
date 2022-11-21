const collegeModel = require("../models/collegeModel")
const internModel=require("../models/internModel")


const createCollege = async function(req,res){
    try{
        
        const{name,fullName,logoLink} = req.body
    
        let savedcollege = await collegeModel.create({name,fullName,logoLink})
        return res.status(201).send({status : true,data : savedcollege})
    }
    catch(err){
        return res.status(500).send({status :false,message : err.message })
    }
    }
    


const listOfCollageIntern=async function(req,res){
    let data = req.query

if(![collegeName].includes(...data)) return res.status(400).send({status:false,msg:"query can only collegeName"})

 
let collegeId=await collegeModel.findOne(data)
if(!collegeId){return res.status(400).send({status:false,msg:"COLLEGE NOT FOUND GIVE RIGHT COLLEGE NAME"})}
if(collegeId.isDeleted) {return res.status(400).send({status:false,msg:"COLLEGE HAS BEEN DELETED"})}
 
let internsNameWithCollege= await internModel.find({collegeId:collegeId._id})
if(internsNameWithCollege.length==0) return res.status(400).send({status:false,msg:"NO INTERN FOUND FROM THIS COLLAGE"})

let NewData={
    name:collegeId.name,
    fullName:collegeId.fullName,
    logoLink:collegeId.logoLink
}

return res.status(200).send({data :NewData,interns:internsNameWithCollege})

}



module.exports={listOfCollageIntern,createCollege}