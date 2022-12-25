const express = require("express")
const router = express.Router();
const { createCustomer, getCustomer, deleteCustomer } = require("../controller/customerController")
const { createCard, getAllCart } = require("../controller/cardController")

//<<<<<<<-------Customet APIs--------->>>>>
router.post("/createCustomer", createCustomer)
router.get("/getCostomer/:customerID", getCustomer)
router.delete("/DeleteCustomer/:customerID", deleteCustomer)

router.post("/createCard/:customerID", createCard)
router.get("/get", getAllCart)


module.exports = router