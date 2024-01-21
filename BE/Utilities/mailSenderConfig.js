const nodemailer = require('nodemailer');
const { createJwtToken } = require('./jwtConfig');
const BASE_URL = "http://localhost:9000/users";

const mailSender = async (email, HTML_TEMP_NAME, otp) => {

  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "keshavtomar53@gmail.com",
        accessToken: "ya29.a0AfB_byC7BpkPWVaGVNL_kPMfd9IVQYSKnh603JUog2kCsSAJNlU5AT6wT9YwWjGpXOjiFkoL9B--rxVEk9hJLLapA55xEySNaHxL9-7KeKT9lCKpJsBaED9BYFqJUGuy8dE8AB3o2gGD21ncgeQnUQUgWvX0fUWeVwMcaCgYKARcSARESFQHGX2Mijh_rDnxnaOg8WlEA1jDNWw0171"
      },
    });

    // Creat JWT OTP
    const jwtOtp = await createJwtToken(otp, 60 * 60)

    // Send emails to users
    let info = await transporter.sendMail({
      from: 'keshavtomar53@gmail.com',
      to: email,
      subject: 'welcome In my school',
      html: HTML_TEMPLATES[HTML_TEMP_NAME](jwtOtp)

    });
    return info;
  } catch (error) {
    console.log("@@@@@@@", error);
  }
};

 const emailConfigs = {
  mailSender,
  'HTML': {
   VERIFY_ACCOUNT_LINK_HTML: 'VERIFY_ACCOUNT_LINK_HTML',
   CHANGE_PWD_FORM_LINK_HTML: 'CHANGE_PWD_FORM_LINK_HTML'
}
}

module.exports = emailConfigs


// HTML TEMPLATES ----------------------------------------------------------

var HTML_TEMPLATES = {
  VERIFY_ACCOUNT_LINK_HTML: (jwtOtp) => `<a href="${global.GLOBAL_BASEURL}/users/verifyaccount/${jwtOtp}"> Verify Account</a>`,
  CHANGE_PWD_FORM_LINK_HTML: (jwtOtp) => `<a href="${global.GLOBAL_BASEURL}/users/changePwdForm/${jwtOtp}"> Change Password</a>`
}







