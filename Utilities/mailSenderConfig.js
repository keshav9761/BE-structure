const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: "keshavtomar53@gmail.com",
          accessToken: "ya29.a0AfB_byB4BK1APBmeOSCcqNsid_oectbuBUK-flF9jf684WT9TyIpuT70BJETYEDLoq4iFK7I6u081XEyQnUmF9yeCYgDyc9V8LsTkyDIUncik6Gx9QHBR9Rn3g6lQC8p6K40JmQd0t98ithHhraWa2PpedVTtRst1WD_aCgYKAZsSARESFQHGX2MiEp2DUXbhmxpo4lVCjKaGsw0171",
        },
      });

    // Send emails to users
    let info = await transporter.sendMail({
      from: '',
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = mailSender;