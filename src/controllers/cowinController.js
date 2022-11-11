let axios = require("axios");
const { post } = require("../routes/route");


let getStates = async function (req, res) {
    
    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result);
        let data = result.data;
        res.status(200).send({ msg: data, status: true });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
let getBydist =async function(req,res){
    try{
        //let stateid = req.params.stateId
        let district_id = req.query.district_id;
        let date = req.query.date;
        var options ={
            method:"get",
            url:`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${date}`
        }
        let result = await axios(options)
        res.status(200).send({msg:result.data})
    }catch(Error){
        res.status(400).send({ msg: Error.message})
    }
}
let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }
        
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
let getAllmeme = async function (req,res){
    try{
        let options ={
        method:"get",
        url:`https://api.imgflip.com/get_memes`
    }
    let result = await axios(options);
    let data = result.data
    res.status(200).send({msg:data,status: true})
    }catch(Error){
        res.status(400).send({status:false,error:Error.message})
    }
}

let creatMeme =async function(req,res){
    try{
        let Template_id = req.query.template_id;
        let text0 = req.query.text0;
        let text1 = req.query.text1;
        let username = req.query.username;
        let password = req.query.password;
        var options ={
            method:"get",
            url:`https://api.imgflip.com/caption_image?template_id=${Template_id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`
        }
        let result = await axios(options)
        res.status(200).send({msg:result.data})
    }catch(Error){
        res.status(400).send({ msg: Error.message})
    }
}
module.exports.getStates = getStates;
module.exports.getDistricts = getDistricts;
module.exports.getBydist = getBydist;
module.exports.getByPin = getByPin;
module.exports.getOtp = getOtp;
module.exports.getAllmeme = getAllmeme;
module.exports.creatMeme = creatMeme;
