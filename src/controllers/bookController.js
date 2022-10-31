const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
const publisherModel = require("../models/publisherModel.js")

const createBook = async function (req, res) {
    let book = req.body

    let checkAuthorid = await authorModel.find().select({ _id: 1 })
    // let checkAuthorid = await authorModel.findById({_id:book.author}).select({_id:1});

    let checkPublisherid = await publisherModel.find().select({ _id: 1 })
    // let checkPublisherid = await publisherModel.findById({_id:book.publisher}).select({_id:1});



    // console.log(checkAuthorid)
    if (!book.author) {
        res.send("Author ID is required")
    }
    // for (i = 0; i < checkAuthorid.length; i++) {

    //     if (checkAuthorid[i] != book.author) {
            
    //         res.send("Author Id is WORNG!")
    //     }
        else if (!book.publisher) {
            res.send('Publisher Id is required')
        // } else if (checkPublisherid != book.author) {
        //     res.send("Publisher Id is WORNG!")
        }

        else {
            let bookCreated = await bookModel.create(book)
            // console.log(checkAuthorid)
            res.send({ data: bookCreated })
        }
    // }
}
const putNewBook = async function (req, res) {
    let Penguin = await publisherModel.findOne({ name: "Penguin" });
    // let id1 = obj1._id;
    // console.log(id1);
    let HarperCollins = await publisherModel.findOne({ name: "HarperCollins" });
    // let id2 = obj2._id;
    // console.log(id2);

    let newbooks = await bookModel.updateMany(
        { publisher: [Penguin, HarperCollins] },
        { $set: { isHardCover: true } },
        { new: true }
    );
    let updatedbooks = await bookModel.find({ newbooks }).populate('author').populate('publisher');
    res.send({ data: updatedbooks });
};
const updateRating = async function (req, res) {
    let arr1 = await authorModel.find({ ratings: { $gt: 3.5 } });
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


