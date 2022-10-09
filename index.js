// dependencies
const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
//declaring routes
const homeRoute = require("./routes/homeRoute");

const dbApiRoute = require("./routes/dbApiRoute");
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
const expiry = 1000 * 60 * 5;

//session middleware
app.use(
  sessions({
    secret: "DBITCluedInsecretkey",
    saveUninitialized: true,
    cookie: { maxAge: expiry },
    resave: false,
  })
);

// register view engine
app.set("view engine", "ejs");

//configuring middlewares to handle post request

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // to support JSON-encoded bodies

//using Routes
app.use("/", homeRoute);
// app.get("/", (req,res)=>{
//     res.sendFile(__dirname+"/views/login.html");
// });

// app.use("/", homeRoute);

app.use("/dashboard", homeRoute);
app.use("/logout", homeRoute);
app.use(express.static(__dirname + "/views"));

app.use("/sendNotif", homeRoute);
app.use("/action", homeRoute);
// app.use("/listNotif", homeRoute);

app.use("/createUser", homeRoute);
app.use("/listuser", homeRoute);
app.use("/import-excel", importExcel);
// om

//role master
app.use("/dbapi", dbApiRoute);

// app.use("/register", homeRoute);

// cluedIn app signIn / signUp api
app.use("/api/signup", homeRoute);
app.use("/api/signin", homeRoute);
app.use("/tokenIsValid", homeRoute);
app.use("/api/getuser", homeRoute);
app.use("/api/recieveMessage", homeRoute);

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
  res.redirect("/listuser");
});

//creating server
var port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server running http://localhost:${port}`);
});
