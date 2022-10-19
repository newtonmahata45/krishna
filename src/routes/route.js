const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();


router.get('/sol1', function (req, res) {
    let arr = [1, 2, 3, 5, 6, 7]
    let n = arr.length + 1
    // console.log(n)
    sumOfTheNo = n * (n + 1) / 2
    sumOfArr = 0
    for (i = 0; i < arr.length; i++) {
        const element = arr[i]
        sumOfArr = sumOfArr + element
    }
    let result = (sumOfTheNo - sumOfArr)
    console.log(result)
    res.send({result})
})
router.get('/sol2', function (req, res) {
    let arr = [33, 34, 35, 37, 38]
    let n = arr.length + 1
    // console.log(n)
    sumOfTheNo = n * (arr[0] + arr[arr.length-1]) / 2
    sumOfArr = 0
    for (i = 0; i < arr.length; i++) {
        const element = arr[i]
        sumOfArr = sumOfArr + element
    }
    let missingNumber = (sumOfTheNo - sumOfArr)
    console.log(missingNumber)
    res.send({ data: missingNumber } )
})

  


module.exports = router;
// adding this comment for no reason