const cardModel = require("../models/cardModel")
const constomerModel = require("../models/customerModel")

const createCard = async (req, res) => {

    100
    99
    try {
        let customerID = req.params.customerID
        let data = req.body

        const costomer = await constomerModel.findOne({ customerID: customerID }).select({ firstName: 1, lastName: 1, _id: 0, })
        if (!costomer) return res.status(404).send({ status: false, message: "customer is not present" })

        const priviousData = await cardModel.find({}, { cardNumber: 1, _id: 0 }).sort({ cardNumber: -1 }).limit(1);

        if (priviousData.length == 0) {
            data.cardNumber = 'C001'
            data.customerID = customerID
            data.customerName = costomer.firstName + " " + costomer.lastName
            const saveData = await cardModel.create(data)
            return res.status(201).send({ status: true, message: "created successfully", data: saveData })
        }
        let c = priviousData[0].cardNumber.split('').length
        let card = priviousData[0].cardNumber.split('').splice(1, c).join('')
        let b = Number(card)

        data.cardNumber = `C00${b + 1}`
        data.customerID = customerID
        data.customerName = costomer.firstName + " " + costomer.lastName
        const saveData = await cardModel.create(data)
        return res.status(201).send({ status: true, message: "created successfully", data: saveData })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getAllCart = async (req, res) => {
    try {
        const get = await cardModel.find({ status: 'ACTIVE' })

        if (!get) return res.status(404).send({ status: false, message: "data not found" })

        return res.status(200).send({ status: true, message: get })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { getAllCart, createCard }