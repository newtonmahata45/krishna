const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')
});

router.get('/students', function (req, res) {
    console.log("The path params in the request are : ", req.params)
    let students = ['Sabiha', 'Neha', 'Akash']
    res.send(students)
})


// Example 1 for path params
router.get('/students/:studentName', function (req, res) {
    // ':' denotes that the following part of route is a variable
    // The value of this variable is what we are sending in the request url after /students
    // This value is set in the form of an object inside req.params
    // The object contain key value pairs
    // key is the variable in the route
    // value is whatever dynamic value sent in the request url
    let myParams = req.params

    // params attribute is fixed in a request object
    // params contains the path parameters object
    console.log("The path params in the request are : ", myParams)
    res.send('The full name is ' + myParams.studentName)
})

// Example 2 for path params
router.get('/student-details/:name', function (req, res) {
    let requestParams = req.params
    console.log("This is the request ", requestParams)
    let studentName = requestParams.name
    console.log('Name of the student is ', studentName)
    res.send('Hello Guys')
})

//Problem 1
router.get('/movies', function (req, res) {
    let movieArr = ['Rang de basanti', 'The shining', ' Lord of the rings', 'Batman begins']
    console.log("list of movies:    ", movieArr)
    res.send('The list of movies:   ' + movieArr)

})

//Problem 2 and 3
router.get('/movies/:indexNumber', function (req, res) {
    let movieArr = ['Rang de basanti', 'The shining', ' Lord of the rings', 'Batman begins']
    const index = req.params.indexNumber
    if (index >= 0 && index <= movieArr.length) {

        res.send(movieArr[index])
    } else {
        res.send("Plese input only number in between 0 to " + movieArr.length)
    }

})
// Problem 4 and 5

router.get('/films/:filmID', function (req, res) {
    let film = [{
        id: 1,
        name: 'Ramayana'
    }, {
        id: 2,
        name: 'Rocketry'
    }, {
        id: 3,
        name: 'Gold'
    }, {
        id: 4,
        name: 'Super 30'
    }]
    
    const idIndex = req.params.filmID
    // return res.send(film)  //for Problem 4
    for (let i = 0; i < film.length; i++) {
        const filmName = film[i];
        if (filmName.id == idIndex) {
            return res.send(filmName)
        }


    } res.send("No movie exists with this id")

})


module.exports = router;