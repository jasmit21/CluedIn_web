// dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//declaring routes 
const homeRoute = require("./routes/homeRoute");

const dbApiRoute = require("./routes/dbApiRoute");

const path = require('path');


//using css , js , jquery .....for styling 
// app.set('view engine', 'hbs');

//configuring middlewares to handle post request 

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());       // to support JSON-encoded bodies

//using Routes
app.use("/",homeRoute);
// app.get("/", (req,res)=>{
//     res.sendFile(__dirname+"/views/login.html");
// });

app.use("/",homeRoute);

app.use("/dashboard", homeRoute);

app.use(express.static(__dirname + "/views"));


app.use("/sendNotif", homeRoute);
app.use("/listNotif", homeRoute);

app.use('/createUser',homeRoute);
app.use("/listuser",homeRoute);


app.use('/action', homeRoute);

// om
app.use("/dbapi",dbApiRoute);
app.use("/register", homeRoute);



//creating server 
var port = process.env.PORT || 4000;
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`server running http://localhost:${port}`);
});

