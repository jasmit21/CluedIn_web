const express = require('express');
const homeController = require('../controllers/homeController');
const router = express.Router();
const firebaseAdmin = require("firebase-admin");
const dbApiController = require('../controllers/dbApiController');
const app = express();

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(require("../cluedin-db185-firebase-adminsdk-g30hi-5e023ee3ab.json")),
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json);

// const homeNotifController = require('../controllers/homeNotifController');

router.get('/', homeController.get);

router.post("/register", homeController.post);

router.post('/sendNotif',notifController.post);

router.get("/dbapi",dbApiController.get);

module.exports = router;

