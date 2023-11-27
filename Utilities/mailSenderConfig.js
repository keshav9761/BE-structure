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
        accessToken: "ya29.a0AfB_byBSx1NhmEEXS6e8LUowkGp-QdWKel6fgjLkJFFEsUh68e8DwnspK27k666W8WohO1vlolD4BH28gpKgVOMl6adRgkGaMQXYTadi1kttDjewmWTueO9FN0KyzkLq7wxfBHth6wAGH4P3iYRT8V_MAGdhMM4-mCCzaCgYKARcSARESFQHGX2MifkVt7tjiA9cTRvc233zo2g0171"
      },
    });

    // Send emails to users
    let info = await transporter.sendMail({
      from: 'ram@gmail.com',
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