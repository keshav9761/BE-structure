const dbConfig = require('../Utilities/dbConfig')
const bcrypt = require('bcrypt')

const userDetail = (req, res) => {
    const { userName, email, password, date } = req.body;
    //check email
    const mailCheck = 'SELECT email FROM users '
    dbConfig.query(mailCheck, (err, result) => {
        const checkMail = result?.some(data => data.email === email)

        if (checkMail === true) {
            // console.log("$$$$", result)
            return res.send({ msg: "this email already exist" })
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
                res.send({ msg: "you are the member", result })
            })
        })

    })
}
module.exports = { userDetail }