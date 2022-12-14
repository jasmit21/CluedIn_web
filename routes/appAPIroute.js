//import modules 
const express = require("express");
const router = express.Router();
const path = require("path");

//import controller files 
let authAppUser = require("../controllers/appControllers/authAppUser");
let firebase_token = require("../controllers/appControllers/firebaseTokenAPI");


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json);

//app authentication
router.post('/authAppUser',authAppUser.post);  // http://localhost:5000/api/app/authAppUser

//store firebase token from app into database
router.post('/firebaseToken',firebase_token.post)  //http://localhost:5000/api/app/firebaseToken
   

module.exports = router;
