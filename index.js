// dependencies
const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
//declaring routes
const homeRoute = require("./routes/homeRoute");

const dbApiRoute = require("./routes/dbApiRoute");

const path = require("path");

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

//creating server
var port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server running http://localhost:${port}`);
});
