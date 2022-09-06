const express = require('express');
const app = express();

//connecting homeroute.js 
const homeRoute = require("./routes/homeRoute");
const registerRoute = require("./routes/registerRoute");

//connecting dbConnect.js
const mysql = require("./models/dbConnect").con;

//using css , js , jquery .....for styling 
app.use(express.static(__dirname + "/views"));

var bodyParser = require('body-parser');
//configuring middlewares to handle post request 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());       // to support JSON-encoded bodies
//using homeRoute
app.use("/", homeRoute);
app.use("/sendNotif", homeRoute);

// om
app.use("/register", homeRoute);

//creating server 
var port = process.env.PORT || 4000;
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`server running http://localhost:${port}`);
});

