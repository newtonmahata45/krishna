const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController.js")
// const bookModel =require("../models/bookModel.js")

// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!")
// })

// router.post("/createUser", UserController.createUser  )

// router.get("/getUsersData", UserController.getUsersData)


router.get("/allBook",UserController.allBook)
router.post("/creatBook", UserController.creatBook)

module.exports = router;
