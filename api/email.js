const nodemailer = require('nodemailer');

async function sendOTP(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "nguyenvietthang5626@gmail.com",
        pass: "123123Thang",
    },
  });

  const mailOptions = {
    from: 'nguyenvietthang5626@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully');
  } catch (err) {
    console.error('Error sending OTP:', err);
  }
}

module.exports = {
  sendOTP,
};
