const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();



// let players =
//     [
//         {
//             "name": "manish",
//             "dob": "1/1/1995",
//             "gender": "male",
//             "city": "jalandhar",
//             "sports": [
//                 "swimming"
//             ]
//         },
//         {
//             "name": "gopal",
//             "dob": "1/09/1995",
//             "gender": "male",
//             "city": "delhi",
//             "sports": [
//                 "soccer"
//             ]
//         },
//         {
//             "name": "lokesh",
//             "dob": "1/1/1990",
//             "gender": "male",
//             "city": "mumbai",
//             "sports": [
//                 "soccer"
//             ]
//         },
//     ]

// router.post('/players', (req, res) => {
//     let player = req.body;
//     let playerExists = players.find(p => p.name === player.name);
//     if (playerExists) {
//         res.send('Player already exists');
//     } else {
//         players.push(player);
//         res.send(players);
//     }
// });

let persons = [
    {
        name: "PK",
        age: 10,
        votingStatus: false
    },
    {
        name: "SK",
        age: 20,
        votingStatus: false
    },
    {
        name: "AA",
        age: 70,
        votingStatus: false
    },
    {
        name: "SC",
        age: 5,
        votingStatus: false
    },
    {
        name: "HO",
        age: 40,
        votingStatus: false
    }
]

router.post('/votingAge', function (req, res) {
    let age = req.query.age
    let arr = []
    for (let index = 0; index < persons.length; index++) {
        const element = persons[index];
        if (element.age >= age) {
            element.votingStatus = true
            arr.push(element)
        }

    }
    res.send({eligible : arr} )
})
module.exports = router;
// adding this comment for no reason