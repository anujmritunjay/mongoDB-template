const express = require('express')
const authRouter = require('./../routes/authRoutes')


const router = express.Router()

router.use('/auth', authRouter)



module.exports = router