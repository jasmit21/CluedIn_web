const con = require("../models/dbConnect");
const session = require("express-session");
const path = require('path');

module.exports = {
  post: (req, res) => {
    // console.log(req.body.userName);
    // console.log(req.body.user_pwd);

    var usermobno = req.body.userName;
    var pwd = req.body.user_pwd;

    // var sql = "INSERT INTO notif_table (title,message,expDate,schDate,category) VALUES ?";
    var sql = `Select * from user_details where user_mobno = "${usermobno}" and user_pwd = "${pwd}"`;

    con.query(sql, (err, result) => {
      console.log(result);
      if (err) res.send(err);
      if (result.length >= 1) {
        // req.session.usermobno = usermobno;
        var session = req.session;
        session.userid = req.body.userName;
        console.log(req.session);
        var Path = path.join(__dirname, "..", "views", "index.html");
        res.sendFile(Path);
      } else res.redirect("login.html");
    });
  },
};
