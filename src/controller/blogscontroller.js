const Blogsmodel=require("../model/Blogsmodel.js")
const authormodel=require("../model/authormodel")

const createBlog=async function(req,res){
 let Blogs=req.body
 let blogCreated=await Blogsmodel.create(Blogs)
 res.send({msg:blogCreated})

}



module.exports.createBlog=createBlog













