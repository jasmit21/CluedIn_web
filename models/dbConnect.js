
const mysql = require('mysql');
// const homeController = require('../controllers/homeController');
const pool = mysql.createPool({



    host: "128.199.23.207",
    user: "cluedin",
    password: "cluedin",
    database: 'cluedin',
    multipleStatements: true,
    connectionLimit : 100,

    // host: "128.199.23.207",
    // user: "cluedin",
    // password: "cluedin",
    // database: 'cluedin',
    

});
pool.getConnection((err)=>{
    if (err) throw err;    
    console.log("DATABASE CONNECTED!!!");
});

module.exports = pool; 

    // host: "cluedin.c2hlbphxofti.us-west-2.rds.amazonaws.com",
    // user: "admin",
    // password: "cluedin123",
    // database: 'cluedin',
    // connectionLimit : 100,