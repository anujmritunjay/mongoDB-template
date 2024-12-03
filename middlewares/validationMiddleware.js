const Joi = require('joi');

const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorDetails = error.details;
    if(errorDetails && errorDetails.length){
        const message = errorDetails[0]?.message?.replace(/"/g, '');
        return res.status(400).json({ success: false, errors: message });
    }
    
}
  next();
};

module.exports = validateRequest;
