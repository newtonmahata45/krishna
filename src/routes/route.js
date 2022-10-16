const express = require('express');
const router = express.Router();///test-you
//importing a custom module
const prob1 = require('../logger/logger.js')
const prob3 = require('../vaildator/formatter.js')
const prob2 = require('../util/helper.js')
//importing external package
// const underscore = require('underscore')
const lodash = require('lodash')

router.get('/test-me', function (req, res) {
    //Calling the components of a different custom module
    console.log("Calling my function ",prob1.welcome())
    console.log("The value of the constant is ",prob1.myUrl)
    console.log(prob2.myinfo())
    console.log(prob2.myasd())
    console.log(prob3.newt())
    
    //Trying to use an external package called underscore
    // let myArray = ['Akash', 'Pritesh', 'Sabiha']
    let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let oddNumbers =[9,13,7,3,17,1,25,21,45,87]
    // let result = underscore.first(myArray)
    // console.log("The result of underscores examples api is : ", result)
    
    let nm = lodash.chunk(monthArray,4)
    console.log(nm)
    let bb = lodash.tail(oddNumbers)
    console.log(bb)
    res.send('My first ever api!')

    //To be tried what happens if we send multiple response
    //res.send('My second api!')
});

module.exports = router;