const nodemailer = require('nodemailer');
const { createJwtToken } = require('./jwtConfig');
const BASE_URL = "http://localhost:9000/users/verifyaccount"

const mailSender = async (email, title, otp) => {

  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "keshavtomar53@gmail.com",
        accessToken: "ya29.a0AfB_byAwA8SUB96AtpCYuEJ5pQXUISF5wtDNGFO__BNbdBdRGo4HxtgRETRS2b5jcmQqWPlNYplJ-ozBnfpZWH9UoQpTSQz6vcNJpU8Bm1lFt2QSQu2C-r8KkG5rlqIeMSe8aYuEvRB-PTWW4jxey08lA4hA-IYO0SDaaCgYKAZYSARESFQHGX2MictWeZqwI9IlaxyZd7oD92g0171"
      },
    });

    // Creat JWT OTP
    const jwtOtp = await createJwtToken(otp, 60 * 60)

    // Send emails to users
    let info = await transporter.sendMail({
      from: 'keshavtomar53@gmail.com',
      to: email,
      subject: 'welcome In my school',
      // html: `<a href="${BASE_URL}/${jwtOtp}"> Verify Account</a>`,
      html: `<a href="http://localhost:9000/users/changePwdForm/${jwtOtp}"> Verify Account</a>`
    });
    return info;
  } catch (error) {
    console.log("@@@@@@@", error);
  }
};

module.exports = mailSender;



