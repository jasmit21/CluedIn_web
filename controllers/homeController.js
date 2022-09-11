const firebaseAdmin = require("firebase-admin");
const con = require('../models/dbConnect');

module.exports = {
    get: (req, res) => {
        
        //absolute path 
        // console.log(res.sendFile('views/Index.html', { root: '.' }));

        res.render('index');


        // var qry = "SELECT * FROM notif_table ORDER BY id DESC";

    },
}
