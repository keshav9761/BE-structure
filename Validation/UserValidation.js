const db = require('../Utilities/dbConfig')
const { check, body } = require('express-validator');
const dbConfig = require('../Utilities/dbConfig')

// exports.signUpSchema = () => ([
//   body('password').isLength({ min: 6 }).withMessage('6 words ka daal ba'),
//   body('email').custom(async (email, req) => {
//     try {
//       const rows = await dbConfig.query('SELECT * FROM users WHERE email = ?', [email]) || [];
//       return rows?.length === 0; // Return true if email is unique, false otherwise
//     } catch (error) {
//       throw new Error('Database error');
//     }
//   })
// ])

exports.validateUser = () => ([
  check('userName').notEmpty().withMessage('Please enter the User Name'),
  check('email').isEmail().withMessage('Please enter the unique email'),
  check('password').notEmpty().isLength({ min: 6 }).withMessage('Please enter 6 letter of the strong password')
]);
