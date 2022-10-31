const authorModel = require("../models/authorModel");
const bookModel = require("../models/bookModel");
const publisherModel = require("../models/publisherModel.js");
const mongoose = require('mongoose');


const createBook = async function (req, res) {
    let book = req.body

    if (!book.author) {
        res.send("Author ID is required")
    }
    else if (!book.publisher) {
        res.send('Publisher Id is required')
    }
    if (!mongoose.Types.ObjectId.isValid(book.author)) {
    
        res.send("Author Id is WORNG!")
    }
    else if (!mongoose.Types.ObjectId.isValid(book.publisher)){
        res.send("Publisher Id is WORNG!")
    }

    else {
        let bookCreated = await bookModel.create(book)
        res.send({ data: bookCreated })
    }
    
}
const putNewBook = async function (req, res) {
    let Penguin = await publisherModel.findOne({ name: "Penguin" });

    let HarperCollins = await publisherModel.findOne({ name: "HarperCollins" });

    let newbooks = await bookModel.updateMany(
        { publisher: [Penguin, HarperCollins] },
        { $set: { isHardCover: true } },
        { new: true }
    );
    let updatedbooks = await bookModel.find({ newbooks }).populate('author').populate('publisher');
    res.send({ data: updatedbooks });
};
const updateRating = async function (req, res) {
    let arr1 = await authorModel.find({ rating: { $gt: 3.5 } });
    let newarr = [];
    for (i of arr1) {
    
        id = i._id;
        let tosend = await bookModel.findOneAndUpdate(
            { author: id },
            { $inc: { price: 10 } },
            { new: true }
        ).populate('author').populate('publisher');
        newarr.push(tosend);
    }
    res.send({ mes: newarr });
};
const getBooksData = async function (req, res) {
    let books = await bookModel.find().populate('author').populate('publisher');
    res.send({ data: books })
}

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author')
    res.send({ data: specificBook })

}

module.exports.createBook = createBook
module.exports.putNewBook = putNewBook
module.exports.updateRating = updateRating

module.exports.getBooksData = getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails


