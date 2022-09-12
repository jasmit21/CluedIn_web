// const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth");
const bcryptjs = require("bcryptjs");
const con = require("../models/dbConnect");
module.exports = {
    post : async (req, res) => {
        try{
            var fname = req.body.fname;
        var email = req.body.email;
        var password = req.body.password;
        var mobno = req.body.mobno;
        var hashpwd = await bcryptjs.hash(password,8);
        var sql = "SELECT * FROM user_details where user_email = ?";

        con.query(sql, [email], (err, result) => {
                
            if(err) {
                res.send("sql err");
            }else {
                // Checking if the result length is more than 0.
                 if(result.length > 0) {
                     res.send('Username already exist');
                 }else {
                     var sql="insert into user_details (user_fname,user_email,user_pwd,user_mobno) values ?";
                     var values = [
                        [fname,email,hashpwd,mobno]
                    ];
                    con.query(sql,[values],(err,result)=>{
                        if(err){
                            res.send(err);
                        }
                        res.send(result);
                    });
                }
            }
        });
        }
        catch(e){
            res.status(500).json({ error: e.message });
        }
    }
}