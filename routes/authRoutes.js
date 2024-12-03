const express = require('express')
const { addUser, logIn,me } = require('../controllers/authControllers')
const validateRequest = require('../middlewares/validationMiddleware')
const { addUserValidation, logInValidation } = require('../validations/userValidators')
const authMiddleware = require('../middlewares/authMiddleware')


const router = express.Router()

router.post('/add-user', validateRequest(addUserValidation), addUser)
router.post('/log-in', validateRequest(logInValidation), logIn)
router.get('/me', authMiddleware, me)


module.exports = router