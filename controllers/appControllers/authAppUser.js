const pool = require("../../models/dbConnect");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json);

module.exports = {
  post: (req, res) => {
    // console.log("reached app api");
    var usermobno = req.body.usermobno; //user mobile number sent by app

    // var sql = "INSERT INTO user_message (title,message,expDate,schDate,category) VALUES ?";
    var qry = `Select * from user_details where user_mobno = "${usermobno}"`;

    pool.query(qry, (err, result) => {
      // console.log(result);
      if (err) res.send(err);
      if (result.length == 1) {
        //response for user found
        res.json({  data: null, success: "true", msg: "user is registered" });
      } else {
        //response for user not found
        res.json({ data: null, success: "false", msg: "user is not registered" });
      }
    });
  },
};
