const db = require('../Utilities/dbConfig')
const { check, body } = require('express-validator');
const dbConfig = require('../Utilities/dbConfig');
const { compaireBcrypt } = require('../Utilities/bcryptPwd');



exports.validateUser = () => ([
  check('username').notEmpty().withMessage('Please enter the User Name'),
  check('email').isEmail().withMessage('Please enter the unique email'),
  check('password').notEmpty().isLength({ min: 6 }).withMessage('Please enter 6 letter of the strong password')
]);
// -------------------------------login---------------------------

exports.signinUser = () => ([
  check('email').custom(async (email, { req }) => {

    // To fetch data from DB
    const isAccountExist = new Promise((resolve) => {
      const sql = `SELECT * FROM users WHERE email='${email}'`;
      db.query(sql, async (err, result) => {
        if (err) { console.log("Email Verification", err) }
        resolve(result)
      })
    })

    const accountDetails = await isAccountExist;

    if (accountDetails && accountDetails.length) { // verify email

      const userInfo = accountDetails?.at(0);

      const pwd = req?.body?.password;
      const isPwdMatched = await compaireBcrypt(pwd, userInfo?.password);
      if (isPwdMatched) { // password verify 
        delete userInfo.otp;
        delete userInfo.password;
        req.userInfo = userInfo; // for controller
        return true
      }
      throw new Error('Invalid Credintials!');
    }

  }),
])
// -------------------------------forgetpwd--------------------------

exports.forgetPwd = () => ([
  check('email').isEmail()
    .withMessage('Please enter valid email')
    .custom(async (email, { req }) => {
      const isUserExist = new Promise((resolve) => {
        const sql = `SELECT * FROM users WHERE email='${email}'`;
        db.query(sql, async (err, result) => {
          if (err) { console.log("Email Verification", err) }
          resolve(result)
        })
      })
      let userInfo = await isUserExist;
      if (userInfo && userInfo?.length) {
        req.userInfo = userInfo?.at(0);
        return true;
      } else {
        throw new Error("This Email does not exist.")
      }

    })
]) 