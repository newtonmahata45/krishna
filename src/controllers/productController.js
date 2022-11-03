const ProductModel= require("../models/productModel.js")
const creatProductDetail= async function (req, res) {
    let productDatail = req.body
    let productCreated = await ProductModel.create(productDatail)
    res.send({data: productCreated})
}
module.exports.creatProductDetail = creatProductDetail