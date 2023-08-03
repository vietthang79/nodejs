// khai báo app.get add data, liệt kê, xóa, post...
//cú pháp try catch
const express = require("express");
// var cacheService = require("express-api-cache");
// var cache = cacheService.cache;
var spScheme = require("../model/sanpham");
const bodyParser = require("body-parser");
const multer = require("multer");
var caching = require("../Cache");

// import fetch from 'node-fetch';

const NodeCache = require("node-cache");
var app = express();

// const todosURL = "http://localhost:3000/create/index";
// const MyCache = new NodeCache({ stdTTL: 10 });

// --------------------------------------- cache ---------------------------------------

//thêm 1 sản phẩm
app.get("/", (req, res) => {
  res.render("create.hbs", { tieudeSV: "Thêm SV!" });
});
const upload = require("../Uploadhinh/uploadimg");
// const { Schema } = require("mongoose");
app.post("/", upload.single("Hinh"), async (req, res) => {
  const s = new spScheme(req.body);
  if (req.file) {
    s.Hinh = req.file.filename;
    console.log(s.Hinh);
  }
  try {
    await s.save();
    console.log("Thêm thành công!" + s);
    res.render("create.hbs", { tieudeSV: "đã thêm sản phẩm thành công" });
    console.log("Thêm thành công!");
  } catch (error) {
    res.status(500).render(error);
    console.log("Thêm thất bại! ", error);
  }
});
// app.post("/", upload.single("Hinh"), (req, res, next) => {
//   const file = req.file;
//   if (!file) {
//     const error = new Error("Please upload a file!");
//     return next(error);
//   }
//   // res.send("upload successfully")
//   let product = new Object();
//   product.MaSP = spScheme.length + 1;
//   product.TenSP = req.body.TenSP;
//   product.LoaiSP = req.body.LoaiSP;
//   product.HSD = req.body.HSD;
//   product.SoLuong = req.body.SoLuong;
//   product.GiaSP = req.body.GiaSP;
//   product.Hinh =urlImages;

// });
// app.post("/", upload.single("Hinh"), async (req, res, next) => {
//   const s = new spScheme(req.body);
//   const file = req.file;
//   if (!file) {
//     const error = new Error("Please upload a file!");
//     return next(error);
//   }
//   try {
//     await s.save();
//     res.render("create.hbs", { tieudeSV: "đã thêm sản phẩm thành công" });
//     console.log("Thêm thành công!");
//   } catch (error) {
//     res.status(500).render(error);
//     console.log("Thêm thất bại! ", error);
//   }
// });

app.get("/index", (req, res) => {
  spScheme.find({}).then((sp_ar) => {
    res.render("index.hbs", {
      sp_ar: sp_ar.map((s) => s.toJSON()),
    });
    console.log(sp_ar);
  });
});
// const Page_size = 2;
// app.get("/indexs", (req, res, next) => {
//   var page = req.query.page;
//   console.log(page);

//   if (page) {
//     page = parseInt(page);
//     var soluongboqua = (page - 1) * Page_size;
//     console.log(page + soluongboqua);

//     spScheme
//       .find({})
//       .skip(soluongboqua)
//       .limit(Page_size)
//       .then((sp_ar) => {
//         // res.json(sp_ar);
//         res.render("index.hbs", {
//           sp_ar: sp_ar.map((s) => s.toJSON()),
//         });
//       })
//       .catch((err) => {
//         res.status(500).json("loi server.");
//       });
//   } else {
//     spScheme
//       .find({})
//       .skip(soluongboqua)
//       .limit(Page_size)
//       .then((sp_ar) => {
//         res.json(sp_ar);
//       })
//       .catch((err) => {
//         res.status(500).json("loi server.");
//       });
//   }
// });

const Page_size = 4;

app.get("/indexs", (req, res, next) => {
  var page = req.query.page;
  console.log(page);

  if (page) {
    page = parseInt(page);
    var soluongboqua = (page - 1) * Page_size;
    console.log(page + soluongboqua);

    spScheme
      .find({})
      .skip(soluongboqua)
      .limit(Page_size)
      .then((sp_ar) => {
        spScheme
          .countDocuments({})
          .then((count) => {
            var totalPage = Math.ceil(count / Page_size);
            var activeButtons = new Array(totalPage).fill("");
            activeButtons[page] = "active";
            res.render("index.hbs", {
              sp_ar: sp_ar.map((s) => s.toJSON()),
              totalPage: totalPage,
              activeButtons: activeButtons,
            });
          })
          .catch((err) => {
            res.status(500).json("Lỗi server.");
          });
      })
      .catch((err) => {
        res.status(500).json("Lỗi server.");
      });
  } else {
    spScheme
      .find({})
      .limit(Page_size)
      .then((sp_ar) => {
        spScheme
          .countDocuments({})
          .then((count) => {
            var totalPage = Math.ceil(count / Page_size);
            var activeButtons = new Array(totalPage).fill("");
            activeButtons[0] = "active";
            res.render("index.hbs", {
              sp_ar: sp_ar.map((s) => s.toJSON()),
              totalPage: totalPage,
              activeButtons: activeButtons,
            });
          })
          .catch((err) => {
            res.status(500).json("Lỗi server.");
          });
      })
      .catch((err) => {
        res.status(500).json("Lỗi server.");
      });
  }
});

//timf kieems
app.post("/index", (req, res) => {
  spScheme
    .find({ TenSP: { $regex: req.body.timkiem_sp, $options: "i" } })
    .then((sp_ar) => {
      res.render("index.hbs", {
        sp_ar: sp_ar.map((s) => s.toJSON()),
        dem: sp_ar.length,
      });
    });
});

app.get("/ViewSP", (req, res) => {
  spScheme.find({}).then((sp_ar) => {
    res.render("ViewSP.hbs", {
      sp_ar: sp_ar.map((s) => s.toJSON()),
    });
  });
});

//delete
// app.get("/delete/:id", async (req, res) => {
//   try {
//     const u = await spScheme.findByIdAndDelete(req.params.id, req.body);
//     if (!u) {
//       res.send("không có sản phẩm này!");
//     } else {
//       res.redirect("/create/index");
//       console.log("Xóa thành công!");
//     }
//   } catch (error) {
//     res.status(500).render(error);
//     console.log("Xóa sản phẩm thất bại! ", error);
//   }
// });

app.get("/delete/:id", async (req, res) => {
  try {
    const u = await spScheme.findByIdAndDelete(req.params.id, req.body);
    if (!u) {
      res.send("không có sản phẩm này!");
    } else {
      res.redirect("/create/index");
      console.log("Xóa thành công!");
    }
  } catch (error) {
    res.status(500).render(error);
    console.log("Xóa sản phẩm thất bại! ", error);
  }
});

//update
app.get("/update/:id", async (req, res) => {
  try {
    spScheme.findById(req.params.id).then((docs) => {
      console.log(req.params.id);
      res.render("Update.hbs", {
        s: docs.toJSON(),
      });
    });
  } catch (error) {
    console.log("Lỗi : ", error);
  }
});
app.post("/CapNhat", async (req, res) => {
  const id = req.body.id;
  const update = {
    TenSP: req.body.TenSP,
    GiaSP: req.body.GiaSP,
    LoaiSP: req.body.LoaiSP,
    HSD: req.body.HSD,
    MaSP: req.body.MaSP,
    SoLuong: req.body.SoLuong,
  };
  const options = {
    new: true,
  };

  spScheme
    .findByIdAndUpdate(id, update, options)
    .then((doc) => {
      res.render("Update.hbs", {
        s: doc.save(),
      });
      console.log("Thành công!");
    })
    .catch((error) => {
      console.log("Lỗi", error);
    });
});

//detail
app.get("/ChiTietSP/:id", caching(300), (req, res) => {
  spScheme.findById(req.params.id).then((docs) => {
    spScheme.find({}).then((s) => {
      res.render("ChiTietSP.hbs", {
        s: docs.toJSON(),
        sp_ar: s.map((u) => u.toJSON()),
      });
    });
  });
});

app.get("/DanhMuc/:page", (req, res) => {
  spScheme
    .find({})
    .skip(0)
    .limit(2)
    .then((sp_ar) => {
      res.render("DanhMuc.hbs", {
        sp_ar: docs.toJSON(),
        sp_ar: sp_ar.map((u) => u.toJSON()),
      });
    });
});

module.exports = app;
