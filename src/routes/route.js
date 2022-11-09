const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const authMW= require("../middleware/auth.js")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

//The userId is sent by front end
//router.get("/users/:userId", userController.getUserData)
router.get("/users/:userId",authMW.authenticate,authMW.authorise, userController.getUserData)
router.post("/users/:userId/posts", authMW.authenticate,authMW.authorise,userController.postMessage)

router.put("/users/:userId",authMW.authenticate,authMW.authorise, userController.updateUser)
router.delete('/users/:userId',authMW.authenticate,authMW.authorise, userController.deleteUser)

module.exports = router;