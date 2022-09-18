const pool = require("../models/dbConnect");

module.exports = {
    get : (req,res)=>{
        getMessageSql = "SELECT message_id,userName,userRole,message_title,message_label_id,user_message,image_url,dateOfCreation from cluedin.user_message where isDelete = 0";
        pool.query(getMessageSql,(err,result)=>{
            res.json({"notifications": result});
        })
    }
}