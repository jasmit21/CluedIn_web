const express = require('express');
const homeController = require('../controllers/homeController');
const notifController = require('../controllers/homeNotifController');
const listNotif = require('../controllers/listNotifController');
const router = express.Router();
const firebaseAdmin = require("firebase-admin");

const dbApiController = require('../controllers/dbApiController');

const con = require('../models/dbConnect');

const app = express();

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(require("../cluedin-db185-firebase-adminsdk-g30hi-5e023ee3ab.json")),
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json);

app.set('view engine', 'hbs');

// const homeNotifController = require('../controllers/homeNotifController');

router.get('/', homeController.get);
router.get('/listNotif', listNotif.get);

// router.post("/register", homeController.post);

router.post("/action",function(request, response, next){
  var action = request.body.action;

  if (action == 'fetch') 
  {
    var qry = "SELECT * FROM user_message ORDER BY message_id DESC";
    con.query(qry, function(error,data){
      if (error) {
        throw error;        
      }
      response.json({
        data:data
      });
    });

  }

});

router.post('/sendNotif',notifController.post);

router.post('/sendNotif',notifController.post);

router.get("/dbapi",dbApiController.get);

module.exports = router;

