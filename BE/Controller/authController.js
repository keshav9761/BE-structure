const dbConfig = require('../Utilities/dbConfig')
const jwtConfig = require('../Utilities/jwtConfig')
const mailSenderConfig = require('../Utilities/mailSenderConfig');
const { generateHash } = require('../Utilities/bcryptPwd');
const { generateOTP2 } = require('../Utilities/otpGen');
const { mailSender, HTML} = mailSenderConfig;

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
    dbConfig.query(sql, { verified: false }, (err, result) => {
        if (err) {
            console.log("error", err);
        }
        if (result?.affectedRows) {
            res.status(200).send(`<b style="color: green"> Account Verified Successfully </b`);
        } else {
            res.status(400).send({ statusText: 'Bad Request', status: 400, msg: "Invalid Token", data: {} })

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
        const emailStatus = await mailSender(email, HTML.VERIFY_ACCOUNT_LINK_HTML, { otp, email });

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
            res.status(201).send({
                statusText: 'Created',
                status: 201,
                msg: "Verify your email entering token sending to your email Id",
                data: result
            })
        })
    })


}

const signinUser = async (req, res) => {
    const { id, ...rest } = req.userInfo || {};
    const token = await jwtConfig.createJwtToken({ id });
    res.status(200).send({
        statusText: 'Success',
        status: 200,
        msg: 'Login Successfully',
        data: { user: rest, token }
    });
}

const forgetPassword = async (req, res, next) => {
    const { id, email } = req.userInfo || {}
    // console.log(">>>>>>>>>", { id, email })
    const otp = generateOTP2();
    //  Send Email 
    const emailStatus = await mailSender(email, HTML.CHANGE_PWD_FORM_LINK_HTML, { otp, id });

    const isDelivered = emailStatus?.accepted?.at(0);

    if (!isDelivered) {
        // console.log(emailStatus);
        return next({ errors: 'Unable to send email', statusCode: 500 })
    }
    const sql = `UPDATE users SET ? WHERE id='${id}'`
    dbConfig.query(sql, { otp }, (err, result) => {
        if (err) {
            return next({ errors: "Error in updating OTP" });
        } else {
            return res.send({ msg: 'Email has been sent successfully' });
        }
    })
}

const resetPassword = async (req, res) => {
    const { jwtToken } = req.params;
    // const decode = await jwtConfig.decodeJwtToken(jwtToken);

    // const sql = `SELECT * FROM users WHERE id='${decode?.id}' AND otp=${decode?.otp}`;
    // // DB email 
    // dbConfig.query(sql, { verified: false }, (err, result) => {
    //     if (err) {
    //         console.log("error", err);
    //     }

    //     if (result?.length) {
    res.render('setNewPwdPage', { data: jwtToken, baseurl: global?.GLOBAL_BASEURL })
    //     } else {
    //         res.send({ msg: "Invalid Token", result })
    //     }
    // })
}

const newRestPwd = async (req, res) => {
    const { jwtToken } = req.params || {};
    const { password } = req.body || {}
    const hashPwd = await generateHash(password);

    const decode = await jwtConfig.decodeJwtToken(jwtToken);
    const { otp, id } = decode || {}
    const sql = `UPDATE users SET ? WHERE id='${id}' AND otp='${otp}'`
    dbConfig.query(sql, { password: hashPwd }, (err, result) => {
        if (err) {
            return next({ errors: "Error in updating OTP" });
        } else {
            return res.send({ msg: 'password updated successfully' });
        }
    })
    // console.log("----------->", { body: req.body, decode });
}


module.exports = { signupUser, verifySingup, signinUser, forgetPassword, resetPassword, newRestPwd }