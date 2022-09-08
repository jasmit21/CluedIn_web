const firebaseAdmin = require("firebase-admin");

module.exports = {
    get : (req, res) => {
        res.sendFile('views/Index.html', { root: '.' });  //absolute path 
        // console.log(res.sendFile('views/Index.html', { root: '.' }));
    },

    post : (req , res) => {
// ----------------------firebase notification-------------------------
         const fcmToken = "ebjzXqouTCeRUMTvWlwP0e:APA91bEcYr-AaP8xNftjJx0ATqtpgQ4_ucGOwm_JfTyTPkJunhFakRxpqqFJrjbo9kMbQ7cQC1_H43IgK3y0dOQFtMOKBuV2cUZfUrwYoIxGpJeh62oNmN5uRVAIFb5vfHYOWKeA1EMM";
         const payload = {
            notification:{
                title:req.body.fname,
                body:req.body.lname,
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
          res.send("notification send");
        //----------------------- fetching details for database -----------------------
        // console.log(req.body); 
        // var fname = req.body.fname;
        // var lname = req.body.lname;
        // var sql = "INSERT INTO persons (FirstName,LastName) VALUES ?";
        // var values = [
        //   [lname,fname]
        // ];
        // con.query(sql,[values], (err, result) => {
        // if (err) res.send(err);
        // res.send("new data inserted");
        // });
// ----------------------------------------------------------------------
        // var notif_title = req.body.notif_title;
        // // console.log(notif_title);
        // var notif_desc  = req.body.notif_desc;
        // var exp_date  = req.body.exp_date;
        // var scheduled_date = req.body.scheduled_date;
        // var category   = req.body.category;  

        // let qry = "INSERT INTO CluedIn.notif_form (notif-title, notif-desc, notif-expDate, notif-scheduledDate, notif-category ) VALUES ('"+notif_title+"' ,'"+notif_desc+"','"+exp_date+"', '"+scheduled_date+"', '"+category+"')";
        // // let qry = "INSERT INTO CluedIn.notif_form (notif-title, notif-desc, notif-expDate, notif-scheduledDate, notif-category ) VALUES ('holiday' ,'today is holiday','23/22/22', '24/43/45', 'IT')";
        
        // // mysql.con.query(qry ,(err) =>{
        // //     if (err) throw err;
        // //     console.log("Data inserted successfully!!!");
        // // });       
        
        // con.connect((err)=>{
        //     if(err) throw err;

        //     con.query(qry, (err,result)=>{
        //         if(err) throw err;
        //         console.log(result)
        //     });
        // })  
    }
}