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
        let isDeleted = req.body.isDeleted
        if (isDeleted == true) {
            let date = new Date()
            req.body.deletedAt = date
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
        console.log("It seems an error", err.message);
        res.status(500).send({ msg: "Error", error: err.message })
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

        let updateblog = await blogModel.updateOne({ _id: blogId, isDeleted: false }, { $set: { "title": Title, "body": body, "isPublished": isPublished, "category": category }, $push: { "tags": tags, "subcategory": subcategory } })
        let perfectDate = moment().format()
        let checkpubish = await blogModel.updateOne({ _id: blogId, isDeleted: false, isPublished: true }, { $set: { "publishedAt": perfectDate } })
        res.send({ updatedData: updateblog })
    }
    catch (err) {
        console.log("It seems an error", err.message);
        res.status(500).send({ msg: "Error", error: err.message })
    }
}


const deleteBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId;

        let deleteTrue = await blogModel.find({ _id: blogId, isDeleted: true })
        if (deleteTrue) {
            let perfectDate = moment().format()
            let deletedBlog = await blogModel.updateOne({ _id: blogId, isDeleted: false }, { $set: { isDeleted: true, deletedAt: perfectDate } });
            res.status(200).send()

        } else {
            res.status(404).send({ msg: "document doesnt exist" })
        }
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })

    }
}


const DeleteBlog = async function (req, res) {
    try {
        let queryParams = req.query

        let perfectDate = moment().format()
        let Blog = await blogModel.findOneAndUpdate({ isDeleted: false, isPublished: true, ...queryParams }, { $set: { isDeleted: true, deletedAt: perfectDate } });
        if (!Blog) {
            // res.status(200).send()}
            res.status(404).send({ msg: "document doesnt exist" })
        }
        else {
            res.status(200).send()
        }

        //  res.status(404).send({ msg: "document doesnt exist" })
    } catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}








module.exports.createBlog = createBlog
module.exports.getFilteredBlog = getFilteredBlog
module.exports.putBlog = putBlog
module.exports.deleteBlog = deleteBlog
module.exports.DeleteBlog = DeleteBlog