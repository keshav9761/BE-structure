const { Joi } = require('express-validation')
const db = require('../Utilities/dbConfig')

exports.signUpSchema = {
  body: Joi.object({
    userName: Joi.string().required().min(5).messages({
      'string.empty': 'Cant be empty',
      'string.min': 'minume length 5 character'
    }),
    email: Joi.string().email().required()
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .messages({
        'string.empty': 'Cant be empty',
        'any.only': 'Invalid Email Format',
        'string.email': 'Please enter a valid email address'
      }),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required()
      .messages({
        'string.empty': 'Password can not be empty',
        'string.pattern.base': 'password must have at least 3number and letter',
        'string.arity': 'Password should contain between 8 to 16 characters long',
      }),
    date: Joi.string()
      .isoDate()
      .optional()
      .messages({
        'date.format': 'Birthdate must be in ISO format (YYYY-MM-DD)',
        'any.required': 'Please provide a birthdate',
      }),
  })
}