const ejs = require("ejs");
const path = require("path");
const nodemailer = require("nodemailer");

// Create a transporter using your email service's SMTP settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

// Create a transporter using your email service's SMTP settings

async function sendConfirmationEmail(user, order) {

  const emailTemplate = await ejs.renderFile(
    path.join(__dirname, "../views/result.ejs"),
    { order }
  );

  // Email content
  const mailOptions = {
    from: process.env.EMAIL,
    to: user,
    subject: "Order Confirmation",
    html: emailTemplate,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending failed:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = { sendConfirmationEmail };
