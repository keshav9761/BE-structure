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
        accessToken: "ya29.a0AfB_byAgGLQuZEsNymMlWocz-zQdA09ibLaBNoSCeYHpEtqUplMwVIa7TR23W2xJelILxkrpeFqQIbDXz8FZ7vO4hI1hOWZgQst3KO7TgLd1ywCcbo5b75uCYQ-m8AA_iXNFadQBdHhQ24PsSu4tKrOvHOAW_ejZkGUdaCgYKAR8SARESFQHGX2MizttIK2ZWb4cat03h_VPwbw0171"
      },
    });

    // Creat JWT OTP
    const jwtOtp = await createJwtToken(otp, 60 * 60)

    // Send emails to users
    let info = await transporter.sendMail({
      from: 'keshavtomar53@gmail.com',
      to: email,
      subject: 'welcome In my school',
      html: `<a href="${BASE_URL}/${jwtOtp}"> Verify Account</a>`,
    });
    return info;
  } catch (error) {
    console.log("@@@@@@@", error);
  }
};
module.exports = mailSender;



