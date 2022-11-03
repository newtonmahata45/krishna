const OrderModel = require("../models/orderModel.js");
const UserModel = require("../models/userModel.js");
const ProductModel = require("../models/productModel.js");
const mongoose = require('mongoose');
const creatOrderDetail = async function (req, res) {
    let data = req.body
    let isFreeAppUserValue = req.headers["isfeeappuser"]

    let userIds = await UserModel.findById(data.userId)
    let productIds = await ProductModel.findById(data.productId)

    if (!userIds) {
        res.send("user Id is NOT found!")
    }
    else if (!productIds) {
        res.send("product Id is NOT found!")
    }
    else if (isFreeAppUserValue == 'true') {
        let savedData = await OrderModel.create(data)
        res.send({ msg: "Successfully Ordered", amount: 0 })
    }
    else if (isFreeAppUserValue == 'false') {
        const balanceKey = await UserModel.findById(data.userId)
        const balanceNum =balanceKey["balance"]

        const priceKey = await ProductModel.findById(data.productId)
        const priceNum =priceKey["price"]
        
        if (balanceNum >= priceNum) {
            const leftBalance = (balanceNum) - (priceNum)

            const updated= await UserModel.findOneAndUpdate((data.product),{$set:{balance:leftBalance}},{ new: true })
            res.send({mag:"Order Successfull",
                amount: priceNum,
                updatedUser: updated})
        }
        else if (balanceNum < priceNum) {

            res.send({msg:"Order Cancel due to Insufficient Balance",
                    ProductPrice: priceNum,
                    UserBalance: balanceNum
        })
        }
    }

    
}
module.exports.creatOrderDetail = creatOrderDetail