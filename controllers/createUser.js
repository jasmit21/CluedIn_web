const con = require('../models/dbConnect');


module.exports = {

    post: (req, res) => {
        // fetching details 
        res.sendfile("views/createUser.html");
        console.log(req.body);

 
        var user_fname = req.body.user_fname;
        var user_lname = req.body.user_lname;
        var user_mobno = req.body.user_mobno;
        var user_pwd = req.body.user_pwd;
        var user_role = req.body.user_role;
        var user_dept = req.body.user_dept;
        var user_gender = req.body.user_gender;
        var user_email = req.body.user_email;
        var user_addr = req.body.user_addr;
        var user_pincode = req.body.user_pincode;
        

        // var sql = "INSERT INTO notif_table (title,message,expDate,schDate,category) VALUES ?";
        var sql = "INSERT INTO user_details (user_fname,user_lname,user_gender,user_email,user_mobno,user_addr,user_pincode,user_pwd,user_role_id,user_department) VALUES ?";
        var values = [
            [user_fname,user_lname,user_gender,user_email,user_mobno,user_addr,user_pincode,user_pwd,user_role,user_dept]
        ];
        con.query(sql, [values], (err, result) => {
            if (err) res.send(err);
            // res.send("notif sent");
            // res.sendfile("createUser.html");
            console.log("data inserted into user_details finally!!!")
        });

    },


}