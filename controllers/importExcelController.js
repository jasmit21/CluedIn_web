//currently not in use as the same code is written in index.js 

const express = require("express");
const app = express();
const multer = require("multer");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const readXlsxFile = require("read-excel-file/node");
const router = express.Router();
const path = require("path");
const pool = require("../models/dbConnect");

app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
var Path = path.join(__dirname, "..","uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    cb(null, Path);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const uploadFile = multer({ storage: storage });

app.post("/import-excel", uploadFile.single("import-excel"), (req, res) => {
  importFileToDb(`${Path}/${req.file.filename}` );
  console.log(res);
});
function importFileToDb(exFile) {
  readXlsxFile(exFile).then((rows) => {
    rows.shift();
    database.connect((error) => {
      if (error) {
        console.error(error);
      } else {
        let query = "INSERT INTO user_details (user_fname,user_lname,user_gender,user_email,user_mobno,user_addr,user_pincode,user_pwd,user_role_id,user_department) VALUES ?";
        pool.query(qryyy, [rows], (error, response) => {
          console.log(error || response);
        });
      }
    });
  });
}
module.exports = router;