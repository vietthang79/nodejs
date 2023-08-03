var express = require("express");
const userModel = require("../model/dangky");
var app = express();
app.get("/", (req, res) => {
  res.render("dangnhap.hbs");
});
app.get("/Quanly", (req, res) => {
  res.render("Quanly.hbs");
});
app.post("/index", async (req, res) => {
  try {
    const check = await userModel.findOne({ Username: req.body.Username });
    await userModel.findOne({ Username: req.body.Username }).then((data) => {
      if (data) {
        console.log(check);
        if (check.Password != null) {
          if (check.Password == req.body.Password) {
            console.log("dn tc");
            var ql = check.Quyen;
            var add = check.Quyen;
            var logout = check.Quyen;
            var login = check.Quyen;
            var signup = check.Quyen;
            var V_Detail = check.Quyen;

            console.log(check.Quyen);
            if (ql == "admin") {
              (ql = "Hiển thị"),
                (add = "Thêm sản phẩm"),
                (logout = "Đăng xuất"),
                (login = ""),
                (signup = ""),
                (V_Detail = "Xem chi tiết");
            } else {
              ql = "";
              add = "";
              login = "";
              signup = "";
              logout = "Đăng xuất"
              V_Detail = "";
            }
            console.log(ql);
            res.render("index.hbs", {
              Name: req.body.Username,
              Quanly: ql,
              ThemSanPham: add,
              DangXuat: logout,
              DangNhap: "",
              DangKy: "",
              ViewDetail : V_Detail,
            });
          } else {
            res.send("sai mk");
          }
        } else {
          console.log("mk =null");
        }
      } else {
        res.send("sai taif khoan");
      }
    });
  } catch (err) {
    console.log("that bai ", err);
  }
});
module.exports = app;
