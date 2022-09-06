const express = require('express');
const homeController = require('../controllers/homeController');
const router = express.Router();
const app = express();

var con = require("../models/dbConnect");

app.use(express.urlencoded({ extended: true }));
app.use(express.json);

var bodyParser = require('body-parser')
const controller = require('../controllers/homeController');

router.get('/', homeController.get);

//routing to form success of noitf submit 

router.post("/sendNotif", (req, res) => {
    res.send(req.body);
    // fetching details 

    console.log(req.body);

    var notif_title = req.body.notif_title;
    console.log(notif_title);
    var notif_desc = req.body.notif_desc;
    var exp_date = req.body.exp_date;
    var scheduled_date = req.body.scheduled_date;
    var category = req.body.category;

    let qry = "INSERT INTO CluedIn.notif_form (notif-title, notif-desc, notif-expDate, notif-scheduledDate, notif-category ) VALUES ('" + notif_title + "' ,'" + notif_desc + "','" + exp_date + "', '" + scheduled_date + "', '" + category + "')";
    // let qry = "INSERT INTO CluedIn.notif_form (notif-title, notif-desc, notif-expDate, notif-scheduledDate, notif-category ) VALUES ('holiday' ,'today is holiday','23/22/22', '24/43/45', 'IT')";

    mysql.con.query(qry ,(err) =>{
        if (err) throw err;
        console.log("Data inserted successfully!!!");
    });       

    con.connect((err) => {
        if (err) throw err;

        con.query(qry, (err, result) => {
            if (err) throw err;
            console.log(result)
        });
    })


});

module.exports = router;
