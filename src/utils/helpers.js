const jwt = require('jsonwebtoken');


const createToken = (user) => {
    const obj = {
        userId: user.id,
        role:user.role
    }
    return jwt.sign(obj, process.env.SECRET_KEY)
}

//nodemailer


module.exports = {
    createToken
}