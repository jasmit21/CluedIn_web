const con = require("../models/dbConnect");

module.exports = {
    get : (req,res)=>{
        getMessageSql = "SELECT message_id,userName,userRole,message_title,message_label_id,user_message,isExpired,dateOfExpiration,image_url,dateOfDeletion,category from cluedin.user_message where isDelete = 0";
        con.query(getMessageSql,(err,result)=>{
            res.json(result);
        })
    }
}