const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const blogModel = require("../model/blogModel.js")
const authorModel = require("../model/authormodel")
const moment = require("moment")

const createBlog = async function (req, res) {
    let blogs = req.body;
    let authorId = req.body.authorId;
    try {
        if (!authorId) {
            return res.status(400).send({ status: false, msg: "authorId must be present" })
        }
        var valid = mongoose.Types.ObjectId.isValid(authorId);
        if (!valid) {
            return res.status(400).send({ status: false, msg: "authorId is Invalid" })
        }
        let author = await authorModel.findById(authorId);
        if (!author) {
            return res.status(404).send({ status: false, msg: "This author is not exists" })
        }
        let isPublished = req.body.isPublished
        if (isPublished == true) {
            let date = new Date()
            req.body.publishedAt = date
        }

        let blogCreated = await blogModel.create(blogs)
        res.status(201).send({ status: true, data: blogCreated })
    } catch (error) {
        return res.status(500).send({ msg: error })
    }
}



const getFilteredBlog = async function (req, res) {
    try {
        let queryParams = req.query
        let Blog = await blogModel.find({ isDeleted: false, isPublished: true, ...queryParams })
        if (Blog) {
            res.status(200).send({ msg: Blog })
        } else {
            res.status(404).send({ msg: "document doesnt exist" })
        }
    }
    catch (err) {
        
        res.status(500).send({ msg: "Error", error: err.message})
    }
}

const putBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId
        let Title = req.body.title 
        let body = req.body.body  
        let tags = req.body.tags   
        let subcategory = req.body.subcategory 
        let isPublished = req.body.isPublished 
        let category = req.body.category
        
        if(Title){if(Title[0]==" "){return res.status(400).send({status:false,msg:"Title will not start with ' '(Space)"})}}
        if(body){if(body[0]==" "){return res.status(400).send({status:false,msg:"body will not start with ' '(Space)"})}}
        if(tags){if(tags[0]==" "){return res.status(400).send({status:false,msg:"tags will not start with ' '(Space)"})}}
        if(subcategory){if(subcategory[0]==" "){return res.status(400).send({status:false,msg:"subcategory will not start with ' '(Space)"})}}

        let perfectDate = moment().format()
        let checkpubish = await blogModel.updateOne({ _id: blogId, isDeleted: false, isPublished: true }, { $set: { "publishedAt": perfectDate } })
        let updateblog = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { $set: { "title": Title, "body": body, "isPublished": isPublished, "category": category }, $push: { "tags": tags, "subcategory": subcategory } },{new:true})
        return res.status(200).send({status: true, updatedData: updateblog })
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

const deleteBlogById = async function(req,res){
    let blogId = req.params.blogId;

    try{

    let blog = await blogModel.findById(blogId);
    
    if (blog.isDeleted == true){
        return res.status(404).send({status:false, msg:"Data not found"})
    }
    let date = new Date()
    let deletedBlog = await blogModel.findOneAndUpdate({_id:blogId},{ $set: { isDeleted: true, deletedAt: date } })

    
    return res.status(200).send()
}catch(err){
    return res.status(500).send({ msg: err })
}

}



const DeleteBlog = async function (req, res) {
    try {
        let queryParams = req.query

        let token = req.headers["x-api-key"];
        let decodedToken = jwt.verify(token, "room-2-secret-key");
        if (decodedToken.authorId.toString() != queryParams.authorId) {
            return res.status(403).send({ message: "You are not Authorised" })
        }
        

        let perfectDate = moment().format()
        let Blog = await blogModel.findOneAndUpdate({ isDeleted: false, isPublished: true, ...queryParams }, { $set: { isDeleted: true, deletedAt: perfectDate } });
        if (!Blog) {
            res.status(404).send({ msg: "document doesnt exist" })
        }
        else {
            res.status(200).send()
        }

    } catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}



module.exports.createBlog = createBlog
module.exports.getFilteredBlog = getFilteredBlog
module.exports.putBlog = putBlog
module.exports.deleteBlogById = deleteBlogById
module.exports.DeleteBlog = DeleteBlog
