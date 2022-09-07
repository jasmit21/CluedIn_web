const con = require('../models/dbConnect');


module.exports = {

    post : (req , res) => {
        // fetching details 
        console.log(req.body);         

        var notif_title = req.body.notif_title;
        // console.log(notif_title);
        var notif_desc  = req.body.notif_desc;
        var exp_date  = req.body.exp_date;
        var scheduled_date = req.body.scheduled_date;
        var category   = req.body.category;  

        var sql = "INSERT INTO notif_table (title,message,expDate,schDate,category) VALUES ?";
        var values = [
          [notif_title,notif_desc,exp_date,scheduled_date,category]
        ];
        con.query(sql,[values], (err, result) => {
        if (err) res.send(err);
        res.send("notif sent");
        console.log("data inserted finally!!!")
        });


    }
}