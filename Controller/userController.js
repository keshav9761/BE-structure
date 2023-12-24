const dbConfig = require('../Utilities/dbConfig')
const jwtConfig = require('../Utilities/jwtConfig')
const { validationResult } = require('express-validator')
const mailSender = require('../Utilities/mailSenderConfig')
const { generateHash } = require('../Utilities/bcryptPwd');
const { generateOTP2 } = require('../Utilities/otpGen');

// const userLogin = (req, res) => {
//     jwtConfig.createJwtToken(req.userInfo,(err, token) => {
//         if (!err) {
//             console.log(`Token: ${token}`);
//         }
//         res.send(token)
//     })
// }

const verifySingup = async (req, res) => {
    const { jwtOtp } = req.params;
    const decode = await jwtConfig.decodeJwtToken(jwtOtp);

    const sql = `UPDATE users SET ? WHERE email='${decode?.email}' AND otp=${decode?.otp}`;
    // DB email 
    dbConfig.query(sql, {verified: false}, (err, result) => {
        if (err) {
            console.log("error", err);
        }
        if(result?.affectedRows) {
            res.send({ msg: "Verified Account Successfully", result })
        } else {
            res.send({ msg: "Invalid Token", result })

        }
    })
}

const signupUser = (req, res, next) => {
    const { username, email, password, date } = req.body;

    //check email
    const mailCheck = `SELECT * FROM users WHERE email='${email}'`;
    dbConfig.query(mailCheck, async (err, result) => {

        if (err) { console.log("Email Verification", err) }

        // if Email is Already in DB
        if (result && result.length) {
            next({ errors: 'Email already exists', statusCode: 400 })
            return;
        }

        // ---------- Create New User ----------------------------
        // bcrypt of password
        const hashPwd = await generateHash(password);
        // generate OTP
        const otp = generateOTP2();
        //  Send Email 
        const emailStatus = await mailSender(email, 'Verify Account', { otp, email });
        
        const isDelivered = emailStatus?.accepted?.at(0);

        if (!isDelivered) {
            // console.log(emailStatus);
            return next({ errors: 'Unable to send email', statusCode: 500 })
        }

        //insert data into DB
        const sql = `INSERT INTO users SET ?`
        const signupData = {
            username,
            password: hashPwd,
            email,
            date: new Date(),
            otp,
            verified: false
        };
        dbConfig.query(sql, signupData, (err, result) => {
            if (err) {
                console.log("Signup:", err);
            }
            res.send({ msg: "Verify your email entering token sending to your email Id", result })
        })
    })


}
module.exports = { signupUser, verifySingup }