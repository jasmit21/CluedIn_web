const con = require('../models/dbConnect');
module.exports = {
    get: (req, res) => {  
    

        res.render('login');
    },
}
