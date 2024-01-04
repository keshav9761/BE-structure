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
        accessToken: "ya29.a0AfB_byDyZnzibh5D5zyrjZeClnytQpBD5Ir81zc0IG8FfwUqPa3MphOCIFlaxscK8nm_-J37fh7bjvA_SYCUCBPXzcISI6m5UwGu0EHgQlc30ehvq4e_QfSxxc4XTRf2b83dpaBeXBzRCH2irrfo-5MVnNbst3ols2tHaCgYKATESARESFQHGX2Mi9CL5RIlUL_Dnw6PO47FjKQ0171"
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



