const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const authMiddleware= require("../middleware/auth.js")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login",authMiddleware.middleware1, userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",authMiddleware.middleware2,authMiddleware.middleware3,authMiddleware.middleware4, userController.getUserData)

router.put("/users/:userId",authMiddleware.middleware2,authMiddleware.middleware3,authMiddleware.middleware4, userController.updateUser)

router.delete("/users/:userId",authMiddleware.middleware2,authMiddleware.middleware3,authMiddleware.middleware4, userController.deleteUser)

module.exports = router;