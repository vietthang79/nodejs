const mongoose = require("mongoose");
// khai báo 1 lược đồ tương ứng với CSDL ( SV,SP,DM...)
var UserScheme = mongoose.Schema({
  TK: { type: String, require: true },
  MK: { type: String, require: true },
  Emai: { type: String, require: true },
  password: { type: String, require: true},
  is_online: { type: String, default: "0"},
  Quyen: { type: String, require: true },
  otp: { type: String, required: true }
});
//ánh xạ lược đồ vào CSDL
const user = mongoose.model("user", UserScheme);
// gắn vào module để xử dụng ở 1 nơi khác
module.exports = user;
