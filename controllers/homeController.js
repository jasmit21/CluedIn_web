const session = require('express-session');
const path = require('path');

module.exports = {
    get: (req, res) => {
        
        
        // //absolute path 
        // console.log(res.sendFile('views/Index.html', { root: '.' }));
        let session = req.session;
        if (session.userid) {
            res.redirect('/dashboard')            
        }
        else
        {     
        var Path =path.join(__dirname,"..","views","login.html");
        res.sendFile(Path);
        }
        
        // res.render('index');


        // var qry = "SELECT * FROM notif_table ORDER BY id DESC";

    },
}
