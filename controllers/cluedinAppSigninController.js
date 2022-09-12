const bcryptjs = require("bcryptjs");
const con = require("../models/dbConnect");
module.exports = {
    post : async (req, res) => {
        try{
        var email = req.body.email;
        var password = req.body.password;
        const searchpwd = () =>{
            var searchemail = "SELECT user_pwd FROM user_details where user_email = ?";
            if(email){
                con.query(searchemail,[email],(err,result)=>{
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
        var sql = "SELECT * FROM user_details where user_email = ? and user_pwd = ?";
        con.query(sql, [email,password], async (err, result) => {
            
            if (!isMatch) {
                return res.status(400).json({ msg: "Incorrect password." });
              }
            const token = jwt.sign({ id: user._id }, "passwordKey");
            res.json({ token, ...user._doc });
        });
        }
        catch(e){
            res.status(500).json({ error: e.message });
        }
    }
}