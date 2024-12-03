const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

const TOKEN_SECRET = "MRITUNJAY_PASWAN"


const getHashPassword = async(password)=>{
    const hashPassword = await bcrypt.hash(password, 10)
    console.log('hashPassword: ', hashPassword);
    return hashPassword
}
const checkPassword = async(password, userPassword)=>{
    return await bcrypt.compare(password, userPassword)
}

const getToken = (tokenPayload)=>{
    return jwt.sign(tokenPayload, TOKEN_SECRET)
}

module.exports = {
    getHashPassword,
    checkPassword,
    getToken
}