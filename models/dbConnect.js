
const mysql = require('mysql');
// const homeController = require('../controllers/homeController');
const pool = mysql.createPool({

    host: "128.199.23.207",
    user: "cluedin",
    password: "cluedin",
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
});

module.exports = pool; 
