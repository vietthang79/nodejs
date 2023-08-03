// khai báo app.get add data, liệt kê, xóa, post...
//cú pháp try catch
var express = require("express");
var spScheme_dangky = require("../model/dangky");

var app = express();

//đăng ký tài khoản
app.get("/", (req, res) => {
  res.render("dangnhap.hbs");
});
app.post("/", async (req, res) => {
  const s_dangky = new spScheme_dangky(req.body);
  try {
    await s_dangky.save();
    // alert("Đăng ký thành công!");
    res.render("dangnhap.hbs");
    console.log("Đăng ký thành công!");
  } catch (error) {
    res.status(500).render(error);
    console.log("Thêm thất bại! ", error);
  }
});
app.get("/ViewUsers", (req, res) => {
  spScheme_dangky.find({}).then((user_ar) => {
    res.render("ViewUsers.hbs", {
      user_ar: user_ar.map((s) => s.toJSON()),
    });
  });
});
//delete
app.get("/delete/:id", async (req, res) => {
  try {
    const u = await spScheme_dangky.findByIdAndDelete(req.params.id, req.body);
    if (!u) {
      res.send("không có người dùng này!");
    } else {
      res.redirect('/dangnhap/ViewUsers');
      console.log("Xóa thành công!")
    }
  } catch (error) {
    res.status(500).render(error);
    console.log("Xóa người dùng thất bại! ", error);
  }
});


module.exports = app;
