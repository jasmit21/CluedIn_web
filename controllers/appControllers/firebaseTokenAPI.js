const pool = require("../../models/dbConnect");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json);

module.exports = {
  post: (req, res) => {
    //api to store firebase token into user_details table
    let usermobno = req.body.usermobno; //user's unique mobile number
    let fbtoken = req.body.firebaseToken; //firebase token of the user
    var qry = `
        UPDATE user_details
        SET 
        firebase_token = "${fbtoken}"
        WHERE user_mobno = "${usermobno}"
        `;
    pool.query(qry,(err,result)=>{
        if (err) {
            res.send(err);
        }
        res.json({msg:"fbToken updated successfully"})
        console.log("Token saved to database");
    })
  },
};
//api url -  http://localhost:5000/api/app/firebaseToken