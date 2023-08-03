const mongoose = require("mongoose");
// khai báo 1 lược đồ tương ứng với CSDL ( SV,SP,DM...)
var spScheme = mongoose.Schema({
  MaSP: { type: String, require: true },
  TenSP: { type: String, require: true },
  LoaiSP: { type: String, require: true },
  HSD: { type: Date, require: true },
  SoLuong: { type: Number, require: true },
  GiaSP: { type: Number, require: true },
  Hinh: { type: String },
});
//ánh xạ lược đồ vào CSDL
const sp = mongoose.model("SANPHAM", spScheme);
// gắn vào module để xử dụng ở 1 nơi khác
module.exports = sp;
