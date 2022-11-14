
const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController")


router.post("/authors", authorController.createAuthor)
router.get("/authors", authorController.getAuthorData)


module.exports = router