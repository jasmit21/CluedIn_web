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
const listuser = require('../controllers/listusercontroller');
const listNotif = require('../controllers/listNotifController')
const updateuser = require('../controllers/updateuserController');
const deleteuser = require('../controllers/deleteuserController');
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
      result.Location
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

//post req to insert data into user table
router.post("/submitUser", createUser.post);

router.get("/createuser", function (request, response) {
  // console.log('create user')
  let session = request.session;
  if (session.userid) {
    response.render("createUser", { message: request.flash("message") });
  } else {
    var Path = path.join(__dirname, "..", "views", "login");
    res.render(Path);
  }
});

//update user details 
router.get("/updateuser", updateuser.update)


//list notification
router.post("/action", listNotif.show);

//list , edit , display users list
router.post("/listuser", listuser.list);
//for delete
router.get("/listuser",deleteuser.delete);


router.post("/sendNotif", notifController.post);

router.post("/api/signup", cluedinAppSignupController.post);
router.post("/api/signin", cluedinAppSigninController.post);
router.post("/tokenisvalid", cluedinAppSigninController.post);
router.get("/api/recieveMessage", cluedinAppRecieveMessagesController.get);

router.get("/dbapi", dbApiController.get);

module.exports = router;
