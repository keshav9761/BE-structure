const db = require('../Utilities/dbConfig')
const { check, body } = require('express-validator');
const dbConfig = require('../Utilities/dbConfig');
const { compaireBcrypt } = require('../Utilities/bcryptPwd');

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
  check('username').notEmpty().withMessage('Please enter the User Name'),
  check('email').isEmail().withMessage('Please enter the unique email'),
  check('password').notEmpty().isLength({ min: 6 }).withMessage('Please enter 6 letter of the strong password')
]);
// -------------------------------login---------------------------

exports.signinUser = () => ([
  check('email').custom((email, { req }) => {

    const sql = `SELECT * FROM users WHERE email='${email}'`;

    db.query(sql, async (err, result) => {
      
      if (err) { console.log("Email Verification", err) }

      if (result && result.length) { // verify email

        const userInfo = result?.at(0);

        const pwd = req?.body?.password;
        const isPwdMatched = await compaireBcrypt(pwd, userInfo?.password);
        if(isPwdMatched) { // password verify 
          req.userInfo = userInfo; // for controller
          return false
        }
        // return false
      }
    })
    // return false;
  }),
])
