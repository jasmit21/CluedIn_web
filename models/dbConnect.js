
const mysql = require('mysql');
// const homeController = require('../controllers/homeController');
const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "root",
    database: 'CluedIn',
});
con.connect((err)=>{
    if (err) throw err;    
    console.log("DATABASE CONNECTED!!!");
})

module.exports = con; 