var express = require("express");
var app = express();
var expressHbs = require("express-handlebars");
app.listen("3000");

app.engine(
  ".hbs",
  expressHbs.engine({ extname: ".hbs", defaultLayout: "main" })
);

app.set("view engine", ".hbs");

app.get("/upload_files", function (req, res) {
  res.render("upload_files");
});

// multer
var multer = require("multer");

var store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Upload_IMG");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: store });
// single up 1 file
app.post("/upload_files", upload.single("inputfile"), (req, res) => {
  console.log(req.file);
  res.send("Successfully");
});

// var upload = multer({ storage: store });
// //array up nhiều file
// app.post("/upload_files", upload.array("inputfile",5), (req, res) => {
//   console.log(req.file);
//   res.send("Successfully");
// });
