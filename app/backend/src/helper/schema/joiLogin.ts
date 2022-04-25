import Joi = require('joi');

const response = 'All fields must be filled';

export default Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': `400|${response}`,
    'string.empty': `400|${response}`,
    'string.email': '401|Incorrect email or password',
  }),
  password: Joi.string().min(4).required().messages({
    'any.required': `400|${response}`,
    'string.empty': `400|${response}`,
    'string.min': '401|Incorrect email or password',
  }),
});
