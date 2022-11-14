const mongoose = require("mongoose")
//const moment = require("moment")
const blogModel = require("../model/blogModel.js")
const authorModel = require("../model/authormodel")
//moment().format('MMMM Do YYYY, h:mm:ss a');

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

        
        let blogCreated = await blogModel.create(blogs)
        res.status(201).send({ status: true, data: blogCreated })
    } catch (error) {
        return res.status(500).send({ msg: error })
    }

}
const getFilteredBlog = async function (req, res) {
    let authorid = req.query.authorid;
    try {
        if (!authorid) {
            return res.status(400).send({ msg: "authorid must be present in Query Params" })
        }
        var valid = mongoose.Types.ObjectId.isValid(authorid);
        if (!valid) {
            return res.status(400).send({ msg: "authorid is Invalid" })
        }
        let author = await authorModel.findById(authorid);
        if (!author) {
            return res.status(400).send({ msg: "This author is not exists" })
        }
        
        let filteredBolg = await blogModel.find({ $and: [{ isDeleted: false }, { isPublished: true }, { authorId: authorid }] })
        if (!filteredBolg[0]) {
            return res.status(404).send({ status: false, msg: "Data not found" })
        }
        return res.status(200).send({ status: true, data: filteredBolg })
    } catch (err) {
        return res.status(500).send({ msg: err })
    }
}

module.exports.createBlog = createBlog
module.exports.getFilteredBlog = getFilteredBlog













