const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController.js")
const bookController= require("../controllers/bookController.js")
const publisherController= require("../controllers/publisherController.js")


router.post("/createAuthor", authorController.createAuthor  )
router.post("/createBook", bookController.createBook  )
router.post("/creatPublisher",publisherController.createPublisher)

router.get("/getAuthorsData", authorController.getAuthorsData)
router.get("/getBooksData", bookController.getBooksData)
router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

router.put("/putNewBook", bookController.putNewBook)
router.put("/updateRating", bookController.updateRating)

module.exports = router;