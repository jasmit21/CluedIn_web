const path = require('path');

module.exports = {
    get: (req, res) => {
        
        //absolute path 
        // console.log(res.sendFile('views/Index.html', { root: '.' }));
        
        var Path =path.join(__dirname,"..","views","login.html");
        res.sendfile(Path);
        // res.render('index');


        // var qry = "SELECT * FROM notif_table ORDER BY id DESC";

    },
}
