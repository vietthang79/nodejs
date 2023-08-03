const mongoose = require("mongoose");
// khai báo 1 lược đồ tương ứng với CSDL ( SV,SP,DM...)
var spScheme_dangky = mongoose.Schema({
  Ho: { type: String, require: true },
  Ten: { type: String, require: true },
  Username: { type: String, require: true },
  Password: { type: String, require: true },
  Email: { type: String, require: true },
  Quyen: { type: String, require: true },


});
//ánh xạ lược đồ vào CSDL
const sp_dangky = mongoose.model("DANGKY", spScheme_dangky);
// gắn vào module để xử dụng ở 1 nơi khác
module.exports = sp_dangky;
