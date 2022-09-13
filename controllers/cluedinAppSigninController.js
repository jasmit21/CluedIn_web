const bcryptjs = require("bcryptjs");
const con = require("../models/dbConnect");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
module.exports = {
    post : async (req, res) => {
        try{
        var email = req.body.email;
        var password = req.body.password;
        const searchpwd = () =>{
            var searchUserPwdSql = "SELECT user_pwd FROM user_details where user_email = ?";
            if(email){
                con.query(searchUserPwdSql,[email],(err,result)=>{
                    if(err)throw err;
                    else if(result.length > 0){
                        return result;
                    }
                    else {
                        return res.json({ msg: "user with this email does not exist" });
                    }                    
                });
            }return res.json({ msg: "please enter email!!" });
        }
        const isMatch = await bcryptjs.compare(password, searchpwd);
        console.log(isMatch);
        if(!isMatch) {
            return res.status(400).json({ msg: "Incorrect password." });
          }
        
          const searchUserId = () => {
            var searchUserIdSql = "SELECT user_id FROM user_details where user_email = ?";
                if(email){
                    con.query(searchUserIdSql,[email],(err,result)=>{
                        if(err)throw err;
                        else if(result.length > 0){
                            return result;
                        }
                        else {
                            return res.json({ msg: "user with this email does not exist" });
                        }                    
                    });
                }return res.json({ msg: "please enter email!!" });
            };
            const token = jwt.sign({ id: searchUserId }, "passwordKey");
            var searchAllUserData = "select (user_email,user_mobno) values"
            con.query(searchAllUserData)
            // res.json({ token, ...user._doc });
        }
        catch(e){
            res.status(500).json({ error: e.message });
        }
    }
}