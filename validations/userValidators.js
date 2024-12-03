const Joi = require('joi');

const addUserValidation = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const logInValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

module.exports = { addUserValidation, logInValidation };
