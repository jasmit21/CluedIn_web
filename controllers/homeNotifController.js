const con = require('../models/dbConnect');
const firebaseAdmin = require("firebase-admin");

module.exports = {

    post : (req , res) => {
        // fetching details 
        console.log(req.body);         

        var notif_title = req.body.notif_title;
        // console.log(notif_title);
        var notif_desc  = req.body.notif_desc;
        var exp_date  = req.body.exp_date;
        var scheduled_date = req.body.scheduled_date;
        var category   = req.body.category;  

        var sql = "INSERT INTO notif_table (title,message,expDate,schDate,category) VALUES ?";
        var values = [
          [notif_title,notif_desc,exp_date,scheduled_date,category]
        ];
        con.query(sql,[values], (err, result) => {
        if (err) res.send(err);
        res.send("notif sent");
        console.log("data inserted finally!!!")
        });

        // ----------------------firebase notification-------------------------
        const fcmToken = "ebjzXqouTCeRUMTvWlwP0e:APA91bEcYr-AaP8xNftjJx0ATqtpgQ4_ucGOwm_JfTyTPkJunhFakRxpqqFJrjbo9kMbQ7cQC1_H43IgK3y0dOQFtMOKBuV2cUZfUrwYoIxGpJeh62oNmN5uRVAIFb5vfHYOWKeA1EMM";
        const payload = {
           notification:{
               title:req.body.notif_title,
               body:req.body.notif_desc,
               // imageUrl: "https://my-cdn.com/extreme-weather.png",
               click_action:"FLUTTER_NOTIFICATION_CLICK",
           },
           data : {
               data1 : "data1",
               data2 : "data2",
           },
        }
        const options ={
           priority : "high",
           timeToLive : 60*60,
        }
         firebaseAdmin.messaging().sendToDevice(fcmToken,payload,options);
        //  res.send("notification send");
    }
}