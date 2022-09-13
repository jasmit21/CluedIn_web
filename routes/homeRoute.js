const express = require('express');
const homeController = require('../controllers/homeController');
const notifController = require('../controllers/homeNotifController');
const listNotif = require('../controllers/listNotifController');
const router = express.Router();
const firebaseAdmin = require("firebase-admin");

const dbApiController = require('../controllers/dbApiController');

const con = require('../models/dbConnect');

const app = express();
const path = require('path');
const createUser = require('../controllers/createUser');
const authUser = require('../controllers/authUser');
const dashboard = require('../controllers/dashboardController');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(require("../cluedin-db185-firebase-adminsdk-g30hi-5e023ee3ab.json")),
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json);

app.set('view engine', 'hbs');



router.get('/', homeController.get);

router.post('/',authUser.post);
router.get('/listNotif', listNotif.get);

//post req to inser data into user table 
router.post('/createUser', createUser.post);

router.get('/dashboard', dashboard.get);

router.post("/action", function (request, response, next) {
  var action = request.body.action;

  if (action == 'fetch') {
    var qry = "SELECT * FROM user_message ORDER BY message_id DESC";
    con.query(qry, function (error, data) {
      if (error) {
        throw error;
      }
      response.json({
        data: data
      });
    });

  }

});



router.post('/listuser', (req, res, next) => {
  var action = req.body.action;

  if (action == 'fetch') {
    var qry = "SELECT user_fname,user_lname,user_email,user_gender,user_role_id,user_department,user_addr,user_pincode FROM user_details ";
    con.query(qry, function (error, data) {
      if (error) {
        throw error;
      }
      res.json({
        data: data
        
      });
    });

  }
});

router.post('/sendNotif', notifController.post);

router.post('/sendNotif',notifController.post);

router.get("/dbapi",dbApiController.get);

module.exports = router;

