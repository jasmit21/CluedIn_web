const con = require("../models/dbConnect");

module.exports = {
    get : (req,res)=>{
        getMessageSql = "SELECT message_id,user_message,message_title,image_url,message_label_id,isExpired,dateOfExpiration,isDelete,dateOfDeletion,category from cluedin.user_message where isDelete = 0";
        con.query(getMessageSql,(err,result)=>{
            res.json(result);
        })
    }
}