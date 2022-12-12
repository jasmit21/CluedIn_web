//import modules 
const express = require("express");
const router = express.Router();
const path = require("path");

//import controller files 
let authAppUser = require("../controllers/appControllers/authAppUser");


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json);

// routes or api's
// console.log("reached api routes");
router.post('/authAppUser',authAppUser.post);
   

module.exports = router;