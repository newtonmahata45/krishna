const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },

    body: { type: String, required: true },

    authorId: { type: ObjectId, required: true, ref: "authorsName" },

    tags: [String],
    category: { type: String, required: true },
    subcategory: [String],

    isDeleted: { type: Boolean, default: false },
    deletedAt: {
        type: String,
        default:null
    },
    isPublished: { type: Boolean, default: false },
    publishedAt:{
        type: String,
        default:null
    }

}, { timestamps: true })


module.exports = mongoose.model('blogs', blogSchema)