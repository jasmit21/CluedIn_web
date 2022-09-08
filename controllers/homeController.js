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
    }
}