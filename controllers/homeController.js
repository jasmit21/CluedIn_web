const con = require('../models/dbConnect');
// var bodyParser = require('body-parser');

module.exports = {
    get : (req, res) => {
        res.sendFile('views/Index.html', { root: '.' });  //absolute path 
        // console.log(res.sendFile('views/Index.html', { root: '.' }));
    },

    post : (req , res) => {
        // fetching details 
        console.log(req.body); 
        var fname = req.body.fname;
        var lname = req.body.lname;
        var sql = "INSERT INTO persons (FirstName,LastName) VALUES ?";
        var values = [
          [lname,fname]
        ];
        con.query(sql,[values], (err, result) => {
        if (err) res.send(err);
        res.send("new data inserted");
        });

        // var notif_title = req.body.notif_title;
        // // console.log(notif_title);
        // var notif_desc  = req.body.notif_desc;
        // var exp_date  = req.body.exp_date;
        // var scheduled_date = req.body.scheduled_date;
        // var category   = req.body.category;  

        // let qry = "INSERT INTO CluedIn.notif_form (notif-title, notif-desc, notif-expDate, notif-scheduledDate, notif-category ) VALUES ('"+notif_title+"' ,'"+notif_desc+"','"+exp_date+"', '"+scheduled_date+"', '"+category+"')";
        // // let qry = "INSERT INTO CluedIn.notif_form (notif-title, notif-desc, notif-expDate, notif-scheduledDate, notif-category ) VALUES ('holiday' ,'today is holiday','23/22/22', '24/43/45', 'IT')";
        
        // // mysql.con.query(qry ,(err) =>{
        // //     if (err) throw err;
        // //     console.log("Data inserted successfully!!!");
        // // });       
        
        // con.connect((err)=>{
        //     if(err) throw err;

        //     con.query(qry, (err,result)=>{
        //         if(err) throw err;
        //         console.log(result)
        //     });
        // })  
    }
}