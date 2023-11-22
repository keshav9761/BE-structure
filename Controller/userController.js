const dbConfig = require('../Utilities/dbConfig')
const jwtConfig = require('../Utilities/jwtConfig')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const mailSender = require('../Utilities/mailSenderConfig')


// const userLogin = (req, res) => {
//     jwtConfig.createJwtToken(req.userInfo,(err, token) => {
//         if (!err) {
//             console.log(`Token: ${token}`);
//         }
//         res.send(token)
//     })
// }

const sendMail = async (req, res) => {
  const result = await mailSender('abbhishekbbhardwaj@gmail.com', "ONE", "<h1> Body </h1>");
  res.send(result);
}

const userDetail = (req, res, next) => {
    console.log(">>>>>>>>>", req.body)
    const { userName, email, password, date } = req.body;

    //check email
    const mailCheck = `SELECT * FROM users WHERE email='${email}'`;
    dbConfig.query(mailCheck, (err, result) => {

        if (err) { console.log("Email Verification", err) }

        // if Email is Already in DB
        if (result && result.length) {
            next({ errors: 'Email already exists', statusCode: 400 })
            return;
        }
        // bcrypt of password
        bcrypt.hash(password, 5, (err, hash) => {
            if (err) {
                return res.status(500).send({ error: 'Internal server error' })
            }
            //insert data into DB

            const sql = `INSERT INTO users SET ?`
            const signupData = {
                username: userName,
                password: hash,
                email: email,
                date: new Date()
            };
            dbConfig.query(sql, signupData, (err, result) => {
                if (err) {
                    console.log("error-signup", err);
                }
                res.send({ msg: "you are registered", result })
            })
        })
    })
}
module.exports = { userDetail, sendMail }