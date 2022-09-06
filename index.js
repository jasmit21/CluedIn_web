const express = require('express');
const app = express();

//connecting homeroute.js 
const homeRoute = require("./routes/home");

//connecting dbConnect.js
const mysql = require("./models/dbConnect").con;

//using homeRoute
app.use("/", homeRoute);
app.use("/sendNotif", homeRoute);
//using css , js , jquery .....for styling 
app.use(express.static(__dirname + "/views"));


var bodyParser = require('body-parser');
//configuring middlewares to handle post request 
app.use(bodyParser.urlencoded({extended: true}));


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


//creating server 
app.listen(3005, (err) => {
    if (err) throw err;
    console.log("Server is running on port 3005");
});

