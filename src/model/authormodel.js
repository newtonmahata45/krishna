
const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({

    fname: { type: String, require: true },
    lname: { type: String, require: true },
    title: { type: String, enum: ["Mr", "Mrs", "Miss"], require: true },
    email: { type: String, lowercase: true, require: true, unique: true },
    password: { type: String, require: true, minimum: 8 }

}, { timestamps: true }
)

module.exports = mongoose.model('authorsName', authorSchema) 