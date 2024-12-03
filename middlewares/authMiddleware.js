const jwt = require('jsonwebtoken');
const ErrorHandler = require('./../utilities/errorHandler')
const User = require('./../models/userModel')

const mysecret = 'MRITUNJAY_PASWAN'



const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return next(new ErrorHandler('Unauthorized', 401));
        }

        const tokenData = jwt.verify(token, mysecret);
        delete tokenData.iat
        const user = await User.findOne(tokenData)
        if (user && user._id) {
            delete user.password
            req.user = user;
            return next();
        } else {
            return next(new ErrorHandler('Unauthorized', 401));
        }
        
    } catch (error) {
        return next(error);
    }
};

module.exports = authMiddleware;