const nodemailer = require('nodemailer');

// Tạo thông tin về tài khoản email
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'nguyenvietthang5626@gmail.com',
    pass: '123123Thang',
  },
});

// Gửi email
function sendMail(to, otp) {
  const mailOptions = {
    from: 'YOUR_EMAIL_ADDRESS',
    to: to,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
}