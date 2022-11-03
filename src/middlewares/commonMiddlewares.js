const freeAppMiddleware = function (req, res, next) {
    let isFreeAppUserValue = req.headers["isfeeappuser"]
    req.isFreeAppUser = isFreeAppUserValue

    if (isFreeAppUserValue == 'false') {

        console.log("False is Working")
    }
    else if (isFreeAppUserValue == 'true') {
        console.log("True is Working")
    }
    else {
        res.send("isFreeAppUser is mandotary in Headers")
    } next()
}
const myOtherMiddleware = function (req, res, next) {
    // Setting an attribute 'wantsJson' in request
    // The header value comparison is done once and
    // the result can be used directly wherever required.
    let acceptHeaderValue = req.headers["accept"]

    if (acceptHeaderValue == "application/json") {
        req.wantsJson = true
    } else {
        req.wantsJson = false
    }
    next()
}

module.exports.myOtherMiddleware = myOtherMiddleware
module.exports.freeAppMiddleware = freeAppMiddleware
