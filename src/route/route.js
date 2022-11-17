
const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController.js")
const blogController = require("../controller/blogController.js")
const authMW = require("../middleware/auth.js")




router.post("/authors", authorController.createAuthor) // create author
router.post("/login", authorController.loginAuthor)

router.post("/blogs", authMW.authenticate, blogController.createBlog) //create Blog

router.get("/blogs", authMW.authenticate, blogController.getFilteredBlog) // get by filter Blog

router.put("/blogs/:blogId", authMW.authenticate, authMW.authorise, blogController.putBlog) // update data

router.delete("/blogs/:blogId", authMW.authenticate,authMW.authorise, blogController.deleteBlogById) //delete by path params

router.delete("/blogs", authMW.authenticate, blogController.DeleteBlog)//delete by query params




module.exports = router;