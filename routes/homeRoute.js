const express = require('express');
const homeController = require('../controllers/homeController');
// const registerController = require("../controllers/registerController");
const router = express.Router();
const app = express();

var con = require("../models/dbConnect");

app.use(express.urlencoded({ extended: true }));
app.use(express.json);

var bodyParser = require('body-parser');


router.get('/', homeController.get);

//om

//routing to form success of noitf submit 

router.post("/register", homeController.post);

module.exports = router;

