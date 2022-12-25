const constomerModel = require("../models/customerModel")
const { v4: uuidv4 } = require('uuid');
const { isValidName, isValidMobile, isValidDob, isValidEmail, validUUID } = require("../validator");


let createCustomer = async (req, res) => {
    try {
        const { firstName, lastName, mobileNumber, DOB, emailID, address } = req.body

        if (!firstName) {return res.status(400).send({ status: false, message: "firstName is mandatory" })}
        if (!lastName) {return res.status(400).send({ status: false, message: "lastName is mandatory" })}
        if (!mobileNumber) {return res.status(400).send({ status: false, message: "mobileNumber is mandatory" })}
        if (!emailID) return res.status(400).send({ status: false, message: "emailId is mandatory" })
        if (!DOB) return res.status(400).send({ status: false, message: "DOB is mandatory" })
        if (!address) return res.status(400).send({ status: false, message: "address is mandatory" })

        if (!isValidName(firstName)) return res.status(400).send({ status: false, message: "firstName is not valid" })
        if (!isValidName(lastName)) return res.status(400).send({ status: false, message: "lastName is not valid" })
        if (!isValidMobile(mobileNumber)) return res.status(400).send({ status: false, message: " mobileNumber is not valid" })
        if (!isValidDob(DOB)) return res.status(400).send({ status: false, message: "DOB is not valid" })
        if (!isValidEmail(emailID)) return res.status(400).send({ status: false, message: "emailId is not valid" })

        let mobileUnique = await constomerModel.findOne({ mobileNumber: mobileNumber })
        if (mobileUnique) return res.status(409).send({ status: false, message: mobileNumber + ` this Mobile Number already exists` })
        let emailUnique = await constomerModel.findOne({ emailID: emailID })
        if (emailUnique) return res.status(409).send({ status: false, message: emailID + ` this Email Id already exists` })

        req.body.customerID = uuidv4()

        const createCustomer1 = await constomerModel.create(req.body)

        return res.status(201).send({ status: true, message: "Customer created successfully", data: createCustomer1 })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}



let getCustomer = async (req, res) => {

    try {
        let customerID = req.params.customerID
        if (!customerID) return res.status(500).send({ status: false, message: "Customer Id is mandatory" })
        if (!validUUID(customerID)) return res.status(400).send({ staus: false, message: "invalid customer Id " })

        const getCustomer = await constomerModel.find({ status: 'ACTIVE', customerID: customerID })
        if (getCustomer.length == 0) {return res.status(404).send({ status: false, message: "costomer is not present" })}
        return res.status(200).send({ status: true, data: getCustomer })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


let deleteCustomer = async (req, res) => {
    
    try {
        let customerID = req.params.customerID
        if (!customerID) {return res.status(400).send({ status: false, message: "please provide customer Id" })}
        if (!validUUID(customerID)) {return res.status(400).send({ status: false, message: "uuid is not valid" })}

        const data = await constomerModel.findOneAndUpdate({ customerID: customerID, status: 'ACTIVE' }, { status: 'INACTIVE' }, { new: true })
        if (!data) {return res.status(404).send({ status: false, message: "costumer data is not found & data aleady deleted" })}

        return res.status(200).send({ status: true, message: "customer data is deleted", data: data })
    }
    catch (err) {
        return res.status(500).send({ status: true, message: err.message })

    }
}

module.exports = { createCustomer, deleteCustomer, getCustomer }