const pool = require("../models/dbConnect");

module.exports = {
    get : (req,res)=>{
        getMessageSql = "SELECT message_id,userName,userRole,message_title,message_label,user_message,image_url,dateOfcreation from cluedin.user_message where isDelete = 0 ORDER BY dateOfcreation DESC";
        pool.query(getMessageSql,(err,result)=>{
            res.json({"notifications": result});
        })
    }
}