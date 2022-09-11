const con = require("../models/dbConnect");

module.exports = {
    get: (req,res)=>{
        var sql = "select * from role_master";
        con.query(sql, (err, result) => {
            if (err) res.send(err);
            res.send(result);
            });
    }
}