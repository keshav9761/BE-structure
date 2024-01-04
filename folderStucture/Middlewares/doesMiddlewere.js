const { validationResult } = require('express-validator');

exports.verifyValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next({ errors: errors.array(), statusCode: 400 }) // Global Error Handler
  }
  next(); // Controller
};