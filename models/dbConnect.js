
const mysql = require('mysql');
// const homeController = require('../controllers/homeController');
const con = mysql.createConnection({

    host: "cluedin.c2hlbphxofti.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "cluedin123",
    database: 'cluedin',

    // host: "localhost",
    // user: "root",
    // password: "root",
    // database: 'CluedIn',
});
con.connect((err)=>{
    if (err) throw err;    
    console.log("DATABASE CONNECTED!!!");
})

module.exports = con; 