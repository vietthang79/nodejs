// //khai báo app.get add data liệt kê  post
// var express = require('express');
// var productSchema = require('../modes/product');
// var app = express();

// const cache = require('../routeCache');

// //Them sp
// app.get("/", (req, res) => {
//     res.render("lab7.hbs", { tieudesp: "Thêm sản phẩm" });
// });
// const { uploadWithProcessing } = require('../middleware/uploadhinh'); // Địa chỉ file uploadMiddleware.js

// app.post("/add", uploadWithProcessing, async (req, res) => {
//     if (req.errorMessage) {
//         res.render("lab7.hbs", { tieudesp: req.errorMessage });
//         return;
//     }
//     const s = new productSchema(req.body);
//     if (req.file) {
//         s.product_image = req.file.filename;
//         // console.log(s.product_image);
//     }
//     try {
//         await s.save();
//         // console.log("thêm thành công");
//         res.render("lab7.hbs", { tieudesp: "Thêm thành công" });
//         console.log(s);
//     } catch (error) {
//         res.render("lab7.hbs", { tieudesp: "Thêm thất bại" });
//         // console.log("thêm tb", error);
//     }
// });

// module.exports = app;


var express = require('express');
var productSchema = require('../model/product');
var app = express();
const multer = require('multer');
const { uploadWithProcessing } = require('../Uploadhinh/uploadhinh');

// Khai báo cấu hình Multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'IMG/Upload_IMG'); // Đường dẫn thư mục để lưu tệp tin upload
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop()); // Tạo tên file duy nhất cho từng file upload
//   }
// });

// // Tạo middleware multer và cấu hình upload nhiều files
// const upload = multer({ storage: storage }).array('product_image', 10); // 'hinh_anh' là tên của trường input file, 10 là số lượng files tối đa cho phép

//Them sp
app.get("/", (req, res) => {
  res.render("formCreate.hbs", { tieudesp: "Thêm sản phẩm" });
});

app.post("/add", uploadWithProcessing, async (req, res) => {
  if (req.errorMessage) {
    res.render("formCreate.hbs", { tieudesp: req.errorMessage });
    return;
  }

  const s = new productSchema(req.body);

  // Xử lý các file đã upload trong req.files
  for (let i = 0; i < req.files.length; i++) {
    // Lưu thông tin về file vào CSDL hoặc thực hiện bất kỳ xử lý nào khác
    console.log(req.files[i].filename);
  }

  if (req.files.length > 0) {
    s.product_image = req.files.map(file => file.filename);
  }

  try {
    await s.save();
    res.render("formCreate.hbs", { tieudesp: "Thêm thành công" });
    console.log(s);
  } catch (error) {
    res.render("formCreate.hbs", { tieudesp: "Thêm thất bại" });
    console.log("Thất bại", error);
  }
});


app.get("/xemchitietSP", (req, res) => {
  productSchema.find({}).then((pr_ar) => {
      res.render("hienthi.hbs", {
          pr_ar: pr_ar.map((s) => s.toJSON()),
      });
      console.log(pr_ar);
  });
});

module.exports = app;
