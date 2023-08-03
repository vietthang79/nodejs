var express = require("express"); // gọi thư viện cho express
var expressHdb = require("express-handlebars");
const app = express(); //khởi tạo

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const nodemailer = require("nodemailer");
const { sendOTP } = require("./api/email");
const randomstring = require("randomstring");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
// require ('dotenv').config;
// const User_routes = require ('./routes/userRoute.js')
// app.use('/', User_routes);
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// const port = process.env.PORT || 3000;

// server.listen(port, () => {
//   console.log('Server listening at port %d', port);
// });

// to access the clearCache function and the changes made to monogoose library
const redis = require("redis");
const redisClient = redis.createClient();

// const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);

// const store = new MongoDBStore({
//   uri: "mongodb+srv://nguyenvietthang5626:123@cluster0.dvgtwqm.mongodb.net/QLBH?retryWrites=true&w=majority",
//   collection: "mySessions",
// });
// app.use(
//   session({
//     secret: "my secret",
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//   })
// );
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use(express.static("./public/images"));
app.use(express.static("./public/Videos"));
app.use(express.static("./public/css"));
app.use(express.static("./public/js"));

app.engine(
  ".hbs",
  expressHdb.engine({ extname: ".hbs", defaultLayout: "main" })
);
// app.set("Views", path.join(__dirname, "Views"));
// app.set("view engine", ".ejs");
app.set("view engine", ".hbs");

app.use(express.static("Views"));
// Thiết lập session middleware

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Cấu hình Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: "157549194011677",
      clientSecret: "66093d750e78f1d87776e420cea1c3cf",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "displayName", "email", "picture.type(large)"], // Thêm trường 'picture' để lấy ảnh đại diện
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const response = await axios.get(
          `https://graph.facebook.com/v13.0/${profile.id}`,
          {
            params: {
              fields: "name,email,picture,birthday,gender", // Thêm trường 'picture' vào danh sách trường lấy
              access_token: accessToken,
            },
          }
        );

        const user = {
          id: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          birthdate: response.data.birthday,
          gender: response.data.gender,
          profilePicture: response.data.picture.data.url, // Lưu trữ URL ảnh đại diện
        };

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Route đăng nhập bằng Facebook
app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

// Sau khi đăng nhập thành công - Hiển thị trang chủ
app.get("/", (req, res) => {
  if (req.user) {
    // res.sendFile(__dirname + '/Views/Trangchu.html');
      res.render("index.hbs")
    // res.send(`<!DOCTYPE html>
    // <html>
    //   <head>
    //     <title>Trang Chủ</title>
    //     <style>
    //       body {
    //         font-family: Arial, sans-serif;
    //         margin: 0;
    //         padding: 20px;
    //         text-align: center;
    //       }

    //       h1 {
    //         margin-bottom: 20px;
    //       }

    //       .welcome-message {
    //         font-size: 24px;
    //         margin-bottom: 20px;
    //       }

    //       .user-info {
    //         font-size: 18px;
    //       }

    //       .logout-button {
    //         margin-top: 20px;
    //         font-size: 16px;
    //         padding: 10px 20px;
    //         border-radius: 5px;
    //         background-color: #3399ff;
    //         color: white;
    //         text-decoration: none;
    //       }
    //       .user-avatar {
    //         width: 150px;
    //         height: 150px;
    //         border-radius: 50%;
    //         object-fit: cover;
    //         margin-top: 20px;
    //       }
    //     </style>
    //   </head>
    //   <body>
    //     <h1>Đăng nhập thành công!</h1>
    //     <div class="welcome-message">Xin chào, ${req.user.displayName}!</div>
    //     <div class="user-info">Ảnh đại diện:</div>
    //     <img class="user-avatar" src="${req.user.profilePicture}" alt="Avatar" />
    //     <div class="user-info">Thông tin tài khoản:</div>
    //     <div class="user-info">ID: ${req.user.id}</div>
    //     <div style="padding-bottom: 30px" class="user-info">
    //       Email: ${req.user.email}
    //     </div>
    //     <a class="logout-button" href="/logout">Đăng xuất</a>
    //   </body>
    // </html>`);
  } else {
    res.send("Bạn chưa đăng nhập.");
  }
});

// Đăng xuất
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Tạo transporter để gửi email
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "nvthangg5@gmail.com", // Địa chỉ email của bạn
//     pass: "aipa coqv hosq saio", // Mật khẩu của bạn
//   },
// });

// function generateOTP() {
//   // Triển khai mã OTP tại đây (ví dụ: tạo một chuỗi số ngẫu nhiên)
//   const otp = Math.floor(100000 + Math.random() * 900000);
//   return otp.toString();
// }

// function sendOTPEmail(email) {
//   const otp = generateOTP();

//   // Tùy chỉnh nội dung email đây
//   const mailOptions = {
//     from: "nguyentrung7478@gmail.com",
//     to: email,
//     subject: "Mã OTP",
//     text: `OTP - ${otp}`,
//   };

//   // Gửi email
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });

//   return otp;
// }

// // Gửi mã OTP qua email
// const email = "nguyentrung7478@gmail.com";
// const otp = sendOTPEmail(email);
// console.log("OTP sent to email:", email);

// -------------- upload hình --------------------//

// Đặt thư mục lưu trữ file upload
// const uploadDirectory = path.join(__dirname, "uploads");

// // Cấu hình multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDirectory);
//   },
//   filename: function (req, file, cb) {
//     // Đảm bảo tên file là duy nhất bằng cách thêm timestamp vào tên
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     );
//   },
// });

// // Giới hạn kích thước file và kiểm tra extension
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // Giới hạn 5MB
//   },
// });

// app.use(express.static("public"));

// app.post("/create/", upload.single("image"), async (req, res) => {
//   try {
//     const file = req.file;

//     // Kiểm tra chiều rộng của hình ảnh
//     const { width } = await sharp(file.path).metadata();
//     if (width <= 50) {
//       throw new Error("Chiều rộng hình ảnh phải lớn hơn 50px.");
//     }
//     // Kiểm tra phần mở rộng của tệp tin
//     const extension = file.originalname.split(".").pop().toLowerCase();

//     if (extension === "png" || extension === "gif" || extension === "jpg") {
//       // Resize và xử lý ảnh
//       // const resized200Path = 'uploads/resized200-' + file.filename;
//       // const resized500Path = 'uploads/resized500-' + file.filename;

//       // sharp(file.path)
//       //   .resize({ width: 200 })
//       //   .jpeg({ quality: 80 })
//       //   .toFile(resized200Path);

//       // sharp(file.path)
//       //   .resize({ width: 500 })
//       //   .jpeg({ quality: 80 })
//       //   .toFile(resized500Path);

//       // Gửi phản hồi thành công
//       res.status(200).json({ message: "Upload và xử lý ảnh thành công." });
//     } else {
//       // Gửi phản hồi lỗi với extension không hợp lệ
//       cb("Extension không hợp lệ. Chỉ chấp nhận file PNG, GIF, JPG.");
//     }

//     // Resize hình ảnh (width=200 và width=500)
//     const resized200Path = uploadDirectory + "/resized200-" + file.filename;
//     const resized500Path = uploadDirectory + "/resized500-" + file.filename;

//     await sharp(file.path)
//       .resize({ width: 200 })
//       .jpeg({ quality: 80 })
//       .toFile(resized200Path);

//     await sharp(file.path)
//       .resize({ width: 500 })
//       .jpeg({ quality: 80 })
//       .toFile(resized500Path);

//     // Thêm watermark vào hình ảnh
//     // const watermarkPath = "watermark.png";

//     // await sharp(resized200Path)
//     //   .composite([{ input: watermarkPath }])
//     //   .toFile(resized200Path);

//     // await sharp(resized500Path)
//     //   .composite([{ input: watermarkPath }])
//     //   .toFile(resized500Path);

//     // Xóa file gốc đã upload
//     // fs.unlinkSync(file.path);

//     // Gửi phản hồi thành công với thông tin các file đã resized
//     res.status(200).json({
//       resized200Name: "resized200-" + file.filename,
//       resized500Name: "resized500-" + file.filename,
//     });
//   } catch (error) {
//     // Xóa file đã upload nếu xảy ra lỗi để tránh lưu các file không hợp lệ
//     if (req.file) {
//       fs.unlinkSync(req.file.path);
//     }

//     // Gửi phản hồi lỗi
//     res.status(400).json({ error: error.message });
//     console.log(error.message);
//   }
// });

app.get("/index", function (req, res) {
  res.render("index");
});

app.get("/dangnhap", function (req, res) {
  res.render("dangnhap");
});

app.get("/dangky", function (req, res) {
  res.render("dangky");
});

app.get("/create", function (req, res) {
  res.render("create");
});
app.get("/fb_success", function (req, res) {
  res.render("indexx", { user: req.user });
});

app.get("/Update", function (req, res) {
  res.render("Update");
});

app.get("/ViewSP", function (req, res) {
  res.render("ViewSP");
});

app.get("/ViewUsers", function (req, res) {
  res.render("ViewUsers");
});

app.get("/QuanLy", function (req, res) {
  res.render("QuanLy");
});
app.get("/upload_files", function (req, res) {
  res.render("upload_files");
});
app.get("/ChiTietSP", function (req, res) {
  res.render("ChiTietSP");
});
app.get("/DanhMuc", function (req, res) {
  res.render("DanhMuc");
});
app.get("/formCreate", function (req, res) {
  res.render("formCreate");
});
app.get('/hienthi', (req, res) => {
  res.render('hienthi');
});
// kết nối csdl
var mongoose = require("mongoose");
// khai báo đường dẫn url
var url =
  "mongodb+srv://nguyenvietthang5626:z0979085680@cluster0.dvgtwqm.mongodb.net/QLBH?retryWrites=true&w=majority";

// khai báo option : các lựa chọn kết nối
app.use(express.json());
var option = {};
// thực hiện kết nối
mongoose
  .connect(url, option)
  .then((result) => {
    console.log("Kết nối thành công ! ");
  })
  .catch((err) => {
    console.log("thất bại", err);
  });

const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());

//thực hiện
const spRoute = require("./routes/spRoute");
app.use("/create", spRoute);
const spRoute_dangky = require("./routes/SignUpRoute");
app.use("/dangnhap", spRoute_dangky);
const spRoute_admin = require("./routes/AdminRoute");
app.use("/", spRoute_admin);
const formCreate = require("./routes/productRoute");
app.use("/formCreate", formCreate);
