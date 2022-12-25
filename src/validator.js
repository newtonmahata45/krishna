const  validUUID = (UUID)=>{
    let sample = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/
    return sample.test(UUID)  
}


const isValidName = (name)=>{
    let sample = /^[a-zA-Z ]+$/
    return sample.test(name)
}

const isValidDob = (DOB)=>{
    let sample = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
    return sample.test(DOB)
}

const isValidEmail = (email)=>{
    let sample = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
    return sample.test(email)
}

const isValidMobile = (phone)=>{
    let sample = /^[6-9]{1}[0-9]{9}$/
    return sample.test(phone)
}

module.exports = { validUUID , isValidName , isValidDob , isValidEmail , isValidMobile }