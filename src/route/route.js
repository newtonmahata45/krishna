const express = require("express")
const router = express.Router();
const collegeController=require("../controllers/collegeController")
const internController=require("../controllers/internController")




router.post("functionup/colleges",collegeController.createCollege)

router.post("/functionup/interns",internController.interns)

router.get("/functionup/collegeDetails",collegeController.listOfCollageIntern)





module.exports=router