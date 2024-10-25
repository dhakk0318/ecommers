// nodemailer.js
const nodemailer = require("nodemailer");

// Function to send OTP email
const sendOTPEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error);
      }
      console.log("Email sent successfully:", info.response);
      resolve(info.response);
    });
  });
};

module.exports = { sendOTPEmail };
