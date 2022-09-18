
const mysql = require('mysql');
// const homeController = require('../controllers/homeController');
const pool = mysql.createPool({

    host: "cluedin.c2hlbphxofti.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "cluedin123",
    database: 'cluedin',
    connectionLimit : 100,

    // host: "localhost",
    // user: "root",
    // password: "root",
    // database: 'CluedIn',
});
pool.getConnection((err)=>{
    if (err) throw err;    
    console.log("DATABASE CONNECTED!!!");
})

module.exports = pool; 