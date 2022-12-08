const express = require('express');
const router = express.Router();
let axios = require("axios");
const cryptoModel = require('../model/cryptoModel');


router.get("/assets", async function (req, res) {
   try{
    const auth = req.headers["Authorization"]
    let options = {
        method: 'get',
        url: `http://api.coincap.io/v2/assets`,
        headers:{Authorization:`Bearer ${auth}`}
    }

    let result = (await axios(options))
    let data = result.data.data

    let sortArr = data.sort(function(a,b){ return b.changePercent24Hr -a.changePercent24Hr })

    await cryptoModel.deleteMany()
    
    await cryptoModel.insertMany(sortArr)

    sortArr.forEach(element => {
        {delete element.explorer}
    });
    res.status(200).send({ status: true, data:sortArr})
}catch(error){
     return res.status(500).send({ status: false, message: error.message })}
})

module.exports = router;
//.sort(function(a,b){ return b.changePercent24Hr -a.changePercent24Hr })
// await cryptoModel.insertMany(newArr[0].data).then((doc) => { res.status(200).send({ status: true, data: doc }) })
//     .catch((error) => { res.status(400).send({ status: false, message: error.message }) })
