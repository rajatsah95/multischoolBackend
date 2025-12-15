const transporter = require("../config/mailer");

exports.sendPasswordEmail = async (to, password) => {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: "Your ERP Login Credentials",
    text: `Your temporary password is: ${password}`,
  });
};
