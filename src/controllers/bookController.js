
const authorModel = require("../models/authorModel");
const BookModel = require("../models/bookModel")



const authorId = async function (req, res) {
    let data = req.body;
    let showData = await authorModel.create(data)
    res.send({ masz: showData })
}

const bookAuthorId = async function (req, res) {
    let data = req.body;
    let showData = await BookModel.create(data)
    res.send({ masz: showData })
}


const getAuthorBook = async function (req, res) {
    const authorId = await authorModel.find({ author_name: "Chetan Bhagat" }).select({ author_id: 1, _id: 0 })
    const auid = authorId.map(element => element.author_id)
    const [x] = auid
    const showData = await BookModel.find({ author_id: x }).select({ name: 1, _id: 0 })


    res.send({ masz: showData })
}


const getAuthorName=async function(req,res){
    const authorId=await BookModel.find({name:"Two states"}).select({author_id:1,_id:0})
    const auid=authorId.map(element=>element.author_id)
    const [x]=auid
    const authorName=await authorModel.find({author_id:x}).select({author_name:1,_id:0})
    const updatedPrice=await BookModel.findOneAndUpdate({name:"Two states"},{$set:{price:150}},{ new: true }).select({price:1,_id:0})
       res.send({masz:[authorName,updatedPrice]})
}



// const createBook = async function (req, res) {
//     let data = req.body

//     let savedData = await BookModel.create(data)
//     res.send({ msg: savedData })
// }

// const getBooksData = async function (req, res) {
//     let allBooks = await BookModel.find({ authorName: "HO" })
//     console.log(allBooks)
//     if (allBooks.length > 0) res.send({ msg: allBooks, condition: true })
//     else res.send({ msg: "No books found", condition: false })
// }


// const updateBooks = async function (req, res) {
//     let data = req.body // {sales: "1200"}
//     // let allBooks= await BookModel.updateMany( 
//     //     { author: "SK"} , //condition
//     //     { $set: data } //update in data
//     //  )
//     let allBooks = await BookModel.findOneAndUpdate(
//         { authorName: "ABC" }, //condition
//         { $set: data }, //update in data
//         { new: true, upsert: true },// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//     )

//     res.send({ msg: allBooks })
// }

// const deleteBooks = async function (req, res) {
//     // let data = req.body 
//     let allBooks = await BookModel.updateMany(
//         { authorName: "FI" }, //condition
//         { $set: { isDeleted: true } }, //update in data
//         { new: true },
//     )

//     res.send({ msg: allBooks })
// }




// CRUD OPERATIONS:
// CREATE
// READ
// UPDATE
// DELETE



// module.exports.createBook= createBook
// module.exports.getBooksData= getBooksData
// module.exports.updateBooks= updateBooks
// module.exports.deleteBooks= deleteBooks
module.exports.authorId = authorId;
module.exports.bookAuthorId = bookAuthorId;
module.exports.getAuthorBook = getAuthorBook;
module.exports.getAuthorName = getAuthorName;
