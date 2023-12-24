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
        accessToken: "ya29.a0AfB_byBiDD9ZkorCj_Nza--NMEFebc66-bh9xd98Xox2mOAgO5zNxJkrjxeccKbqRlkRFSSodydTy_tmlxgBsz9ZPpqFEt7ImZyUi5sEAi4PYCiZa4Cl2LPhL5zZfBoj93GyOiF_NR0VQMFOQZbxtj4bNJT_ntDwZ_WVaCgYKAe8SARESFQHGX2MikNHSH6tbwbPPD5jR82B4iQ0171"
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



