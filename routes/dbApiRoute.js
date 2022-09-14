const express = require('express');
const router = express.Router();
const app = express();
const dbApiController = require("../controllers/dbApiController");

app.use(express.urlencoded({ extended: true }));
app.use(express.json);

router.get("/dbapi",dbApiController.get);

module.exports = router;