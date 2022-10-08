const express = require("express");
const homeController = require("../controllers/homeController");
const notifController = require("../controllers/homeNotifController");

// const listNotif = require('../controllers/listNotifController');

const multer = require("multer");
const { s3Uploadv2, s3Uploadv3 } = require("../models/s3Service");
const router = express.Router();
const firebaseAdmin = require("firebase-admin");
const dashboard = require("../controllers/dashboardController");

const dbApiController = require("../controllers/dbApiController");

const pool = require("../models/dbConnect");

// const bcryptjs = require("bcryptjs");
const cluedinAppSignupController = require("../controllers/CluedinAppSignupController");
const cluedinAppSigninController = require("../controllers/cluedinAppSigninController");
const cluedinAppRecieveMessagesController = require("../controllers/cluedinApprecieveMessageController");

const app = express();
const path = require("path");
const createUser = require("../controllers/createUser");
const authUser = require("../controllers/authUser");
const logoutController = require("../controllers/logoutController");

// firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(require("../cluedInOfficialAndroid.json")),
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.json);

// app.set('view engine', 'hbs');

router.get("/", homeController.get);
//login validation
router.post("/auth", authUser.post);

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10000000, files: 1 },
});
// size limit - 10 mb

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await s3Uploadv2(req.file);
    console.log(
      "-------------------------------------------------------upload-------------------------------------------------\n",
      result
    );
    return res.json({ status: "success" });
  } catch (err) {
    console.log(err);
  }
});

//dashboard
router.get("/dashboard", dashboard.get);

//destroying session
router.get("/logout", logoutController.get);

//listing notification
// router.get('/listNotif', listNotif.get);

//post req to insert data into user table
router.post("/submitUser", createUser.post);

router.get("/createuser", function (request, response) {
  response.render("createUser");
});

router.post("/action", function (request, response, next) {
  var action = request.body.action;

  if (action == "fetch") {
    var qry = "SELECT * FROM user_message ORDER BY message_id DESC";
    pool.query(qry, function (error, data) {
      if (error) {
        throw error;
      }
      response.json({
        data: data,
      });
    });
  }
});

router.post("/listuser", (req, res, next) => {
  var action = req.body.action;
  if (action == "fetch") {
    var qry =
      "SELECT user_fname,user_lname,user_mobno,user_email,user_gender,user_role_id,user_department,user_addr,user_pincode FROM user_details ";
    pool.query(qry, function (error, data) {
      if (error) {
        throw error;
      }
      res.json({
        data: data,
      });
    });
  }
});

router.post("/sendNotif", notifController.post);

router.post("/api/signup", cluedinAppSignupController.post);
router.post("/api/signin", cluedinAppSigninController.post);
router.post("/tokenisvalid", cluedinAppSigninController.post);
router.get("/api/recieveMessage", cluedinAppRecieveMessagesController.get);

router.get("/dbapi", dbApiController.get);

module.exports = router;
