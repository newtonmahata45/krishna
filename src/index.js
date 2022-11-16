const express = require("express")
const bodyparser = require("body-parser")
const app = express()
const route=require("./route/route.js")
const mongoose=require("mongoose")

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

mongoose.connect("mongodb+srv://viHAan:vihaan@projectofroom2.q2ars7d.mongodb.net/Project-1",
    { useNewUrlParser: true }
)
 .then( () =>  console.log("MongoDb is connected") )
 .catch( err => console.log(err))
  app.use('/',route)



  app.listen(process.env.PORT || 3000,function (){
    console.log('Express app running on port'+ (process.env.PORT || 3000))
  });

