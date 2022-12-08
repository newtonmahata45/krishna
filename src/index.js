
const express = require("express")
const mongoose = require("mongoose")
const route = require('./route/route.js');
const app = express()


app.use(express.json())


mongoose.connect("mongodb+srv://newton45:Rohit.45@cluster0.zs6mwy3.mongodb.net/newton",
 	 { useNewUrlParser: true },mongoose.set('strictQuery', false))
.then(() => console.log("MongoDB is connected"))
.catch((error) => console.log(error))



app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
	console.log('Express app running on port ' + (process.env.PORT || 3000))})