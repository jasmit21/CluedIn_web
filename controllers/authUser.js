const con = require('../models/dbConnect');
const session = require("express-session");


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
            if (result.length >= 1)  {
                req.session.usermobno = usermobno;
                res.redirect('/dashboard'); 
            }
            else res.redirect('login.html');
        });
    },
}