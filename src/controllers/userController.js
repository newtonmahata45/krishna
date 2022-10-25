// const UserModel = require("../models/userModel.js")
const bookModel = require("../models/bookModel.js")
// const createUser = async function (req, res) {
//     let data = req.body
//     let savedData = await UserModel.create(data)
//     res.send({ msg: savedData })
// }

// const getUsersData = async function (req, res) {
//     let allUsers = await UserModel.find()
//     res.send({ msg: allUsers })
// }

const creatBook = async function (req, res) {
    let Data = req.body
    let savedData = await bookModel.create(Data)
    res.send({ msg: savedData })
}
const allBook = async function (req, res) {
    let allbooks = await bookModel.find()
    res.send({ message: allbooks })
}

// module.exports.createUser = createUser
// module.exports.getUsersData = getUsersData
module.exports.creatBook = creatBook
module.exports.allBook = allBook
