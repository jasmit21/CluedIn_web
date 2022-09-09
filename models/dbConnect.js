
const mysql = require('mysql');
// const homeController = require('../controllers/homeController');
const con = mysql.createConnection({

    host: "cluedin.c2hlbphxofti.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "clued123",
    database: 'cluedin',
});
con.connect((err)=>{
    if (err) throw err;    
    console.log("DATABASE CONNECTED!!!");
})

module.exports = con; 