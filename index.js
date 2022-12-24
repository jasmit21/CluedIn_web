// dependencies
const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const excel = require('xlsx')
//declaring routes
//router files
const homeRoute = require("./routes/homeRoute");
const appApi = require('./routes/appAPIroute');
const dbApiRoute = require("./routes/dbApiRoute");

//controller
const importExcel = require("./controllers/importExcelController");
const readXlsxFile = require("read-excel-file/node");
const path = require("path");
const pool = require("./models/dbConnect");

//flash
var flash = require("connect-flash");
app.use(flash());

//session
const sessions = require("express-session");
const cookieParser = require("cookie-parser");

//set ccokie-parser
app.use(cookieParser());


//----------------session setup------------------------
// var session;
//creating 5 mins from milliseconds 
const expiry = 1000 * 60 * 60;

//session middleware
app.use(
  sessions({
    secret: "DBITCluedInsecretkey",
    saveUninitialized: true,
    cookie: { maxAge: expiry },
    resave: false,
  })
);
//--------------------session ended-------------------
//firebase
// const { initializeApp } = require('firebase-admin/app');
const firebaseAdmin = require("firebase-admin");
const { credential } = require("firebase-admin");
const serviceAccount = require("./cluedin-79346-firebase-adminsdk-94sut-ab59f886cd.json");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

// register view engine
app.set("view engine", "ejs");

//configuring middlewares to handle post request

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // to support JSON-encoded bodies

//using Routes for web
app.use("/", homeRoute);
app.use("/dashboard", homeRoute);
app.use("/logout", homeRoute);
app.use(express.static(__dirname + "/views"));

app.use("/sendNotif", homeRoute);
app.use("/action", homeRoute);
// app.use("/listNotif", homeRoute);

app.use("/createUser", homeRoute);
app.use("/listuser", homeRoute);
// app.use("/import-excel", importExcel);
app.use('updateuser',homeRoute);

//role master
app.use("/dbapi", dbApiRoute);
app.use("/dropdown",(req,res)=>{
  let qry = `SELECT std_id,std_name FROM standard;SELECT div_id,div_name FROM division`;
  pool.query(qry,(err,result)=>{
    if (err) throw err;
    var data=JSON.parse(JSON.stringify(result));
    console.log(data);
    var data1 = data[0];
    // console.log(data1);
    var data2= data[1];
    // console.log("std"+data1,"    --div"+data2);
    res.json(
      {
        standard:data1,
        division:data2
      })
    // console.log(data1[3].std_id);
  });
});
// app.use("/register", homeRoute);

// cluedIn app api
app.use("/api/signup", homeRoute);
app.use("/api/signin", homeRoute);
app.use("/tokenIsValid", homeRoute);
app.use("/api/getuser", homeRoute);
app.use("/api/recieveMessage", homeRoute);
app.use("/api/app", appApi);
// app.use("/api/authAppUser", homeRoute);


// handle errors related to multer

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "file is too large",
      });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "File limit reached",
      });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "File must be an image",
      });
    }
  }
});

//import excel
var Path = path.join(__dirname, "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const uploadFile = multer({ storage: storage });

function importFileToDb(exFile) {
  readXlsxFile(exFile).then((rows) => {
    rows.shift();
    console.log("rowData =",rows);
    let query =
      "INSERT INTO user_details (user_fname,user_lname,user_gender,user_email,user_mobno,user_addr,user_pincode,user_pwd,user_role_id,user_department) VALUES ?";
    pool.query(query, [rows], (error, result) => {
      console.log(error || result);
    });
  });
}

app.post("/import-excel", uploadFile.single("import-excel"), (req, res) => {
  importFileToDb(__dirname + "/uploads/" + req.file.filename);
  req.flash("message", `Users were created successfully`);
  res.redirect("/createUser");
});

//creating server
var port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server running http://localhost:${port}`);
});
