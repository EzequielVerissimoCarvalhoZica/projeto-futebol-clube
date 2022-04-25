import Joi = require('joi');

export default Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': '422|Incorrect email',
    'any.required': '400|Email is required',
    'string.empty': '422|Email cannot be empty',
  }),
  password: Joi.string().min(4).required().messages({
    'string.min': '422|"password" length must be at least 4 characters long',
    'any.required': '400|Password is required',
    'string.empty': '422|Password cannot be empty',
  }),
});
