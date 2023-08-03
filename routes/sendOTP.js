const nodemailer = require("nodemailer");
const User = require("../model/user");

async function sendOTP(email) {
  try {
    // Tạo mã OTP ngẫu nhiên
    const otp = Math.random().toString().slice(2, 8);

    // Lưu mã OTP vào database hoặc tạo mới nếu email không tồn tại
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, otp });
      await user.save();
    } else {
      user.otp = otp;
      await user.save();
    }

    // Gửi email chứa mã OTP
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "nguyenvietthang5626@gmail.com",
        pass: "123123Thang",
      },
    });

    const mailOptions = {
      from: "nguyenvietthang5626@gmail.com",
      to: email,
      subject: "Mã OTP",
      text: `Mã OTP của bạn là: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Mã OTP đã được gửi đi thành công!");
  } catch (error) {
    console.error("Có lỗi xảy ra khi gửi mã OTP:", error);
  }
}

// Gọi hàm sendOTP(email) với địa chỉ email muốn gửi OTP
sendOTP("nguyenvietthang5626@gmail.com");
