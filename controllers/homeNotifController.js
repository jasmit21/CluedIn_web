const pool = require("../models/dbConnect");
const firebaseAdmin = require("firebase-admin");
const { credential } = require("firebase-admin");
const serviceAccount = require("../cluedInOfficialAndroid.json");
var flash = require("connect-flash");

module.exports = {
  post: async (req, res) => {
    // fetching details
    // console.log(req.body);
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
    });

    var notif_title = req.body.notif_title;
    // console.log(notif_title);
    var notif_desc = req.body.notif_desc;
    var exp_date = req.body.exp_date;
    var scheduled_date = req.body.scheduled_date;
    var category = req.body.category;
    var label = req.body.label;

    // var sql = "INSERT INTO user_message (title,message,expDate,schDate,category) VALUES ?";
    var sql =
      "INSERT INTO user_message (message_title,user_message,dateOfExpiration,scheduled_date,category,message_label) VALUES ?";
    var values = [
      [notif_title, notif_desc, exp_date, scheduled_date, category, label],
    ];
    pool.query(sql, [values], (err, result) => {
      if (err) res.send(err);

      // res.send("notif sent");
      console.log("data inserted finally!!!");
    });

    var getFcmTokensSql = [
      "cghubDBUQVixer-83NkN9n:APA91bFQyrRyUNsDCR3_V1wMUViHZO3Tgst7lVTeWez6CT5J7-hekMEGgvdI26tptTu1UQUvagP-ovYd2ObpXyH0QXpOHWk4D-oUjRPPFK2jWkUO8xq0ye8y8C0Pnbm9DGmyaYIbp1gb",
      "f4AXXfzaQ_6_7LsOaD7DtC:APA91bF80tU46SGXZB1rmqdpki5Agxsv-d4a047KYNI0lOYFHc7kjqVcCRYgkprEqPG-u82WKGduMvwu_xi3HLD_USA079E7CHKV67pjN3isu7mAUI6BR-_LBpzmttJHTrZI-0r-iBWw",
    ];
    // pool.query(getFcmTokensSql,(err,result)=>{
    // if(err) throw err;

    const payload = {
      notification: {
        title: req.body.notif_title,
        body: req.body.notif_desc,
        sound: "default",
        imageUrl:
          "https://techcommunity.microsoft.com/t5/image/serverpage/image-id/366577i4F851B60F8347ED4",
        click_action: "FLUTTER_NOTIFICATION_CLICK",
      },
      data: {
        data1: "data1",
        data2: "data2",
      },
    };
    const options = {
      priority: "high",
      timeToLive: 60 * 60,
    };
    // console.log({result}["result"].map((userResult)=>
    //     userResult["firebase_token"]));
    firebaseAdmin.messaging().sendToDevice(getFcmTokensSql, payload, options);
    // });
    req.flash("message1", "Notification Sent ");
    res.redirect("/dashboard");
    // res.send("ok");

    // data[fcmToken()];
    // console.log(fcmToken());
    // ----------------------firebase notification-------------------------
    // const fcmToken = [
    //     "ebjzXqouTCeRUMTvWlwP0e:APA91bEcYr-AaP8xNftjJx0ATqtpgQ4_ucGOwm_JfTyTPkJunhFakRxpqqFJrjbo9kMbQ7cQC1_H43IgK3y0dOQFtMOKBuV2cUZfUrwYoIxGpJeh62oNmN5uRVAIFb5vfHYOWKeA1EMM",
    //     "dUNs1KbMTTuC9IJ1YN-QNN:APA91bEtf_3484eeJQDboSsV-I7Fddn3JjAKtpUsuQoMamaVAr3x9MTEqksoJolOPgQyQE8KUR_3-Eoy9AFX2XmoxyDbyqExrrCkEg_-_qfC4lJ_K_0uHHQTqFnWcrRSjrMB9ncMDmmq",
    // ];

    //         //  res.send("notification send");
    //     }

    // ye dono nikaalna badmai
  },
};
