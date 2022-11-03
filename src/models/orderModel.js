const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'UserDetail'
    },
    productId: {
        type: ObjectId,
        ref: 'ProductDetail'
    },
    amount: Number,
    isFreeAppUser: Boolean
    // date: new Date().toLocaleDateString()
}, { timestamps: true });
module.exports = mongoose.model("OrderDetail", orderSchema);