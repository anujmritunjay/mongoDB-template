const { getHashPassword, checkPassword, getToken } = require("../services/authService")
const User = require('../models/userModel')
const ErrorHandler = require('../utilities/errorHandler')

exports.addUser = async (req, res, next) => {
    try {
        const payload = req.body
        const userData = await User.findOne({ email: payload.email })
        if (userData && userData.id) {
            return next(new ErrorHandler("User already exists", 401))
        }
        const hashPassword = await getHashPassword(payload.password)
        payload.password = hashPassword
        const user = await User.create(payload)
        delete user.password

        res.json({
            success: true,
            message: user
        })
    } catch (error) {
        return next(error)
    }
}

exports.logIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return next(new ErrorHandler("Invalid credentials.", 403))
        }
        const isPasswordMatch = await checkPassword(password, user.password)
        if (!isPasswordMatch) {
            return next(new ErrorHandler("Invalid credentials.", 403))
        }

        const token = getToken({ _id: user.id })
        res.json({
            success: true,
            user: user,
            token: token
        })

    } catch (error) {
        return next(error)
    }
}
exports.me = async (req, res, next) => {
    try {
        const user = req.user
        res.json({
            success: true,
            data: user,
        })

    } catch (error) {
        return next(error)
    }
}