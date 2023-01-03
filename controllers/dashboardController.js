const session = require("express-session");
const path = require("path");
var flash  = require('connect-flash');
const pool = require("../models/dbConnect");

module.exports = {
  get: (req, res) => {
    var session = req.session;

    // var Path = path.join(__dirname, "..", "views", "index");
    // res.render(Path,{message1 : req.flash('message1')});
    if (session.userid != null) {
      var Path = path.join(__dirname, "..", "views", "index");
      // res.render(Path,{message1 : req.flash('message1')});

      //dynamic data for dropdown in create notif form 
      qry = `SELECT label_id,label_name FROM label_master;SELECT bsd_id,bsd_value FROM BranchStd_Div_Mapping Where bsd_id not in (6,7,8,9,10,14,15,16,17,18,22,23,24,25,26,30,31,32,33,34,35);`
      pool.query(qry,(err,result)=>{
        if (err) {
          throw err;          
        }
        var data=JSON.parse(JSON.stringify(result));
        console.log(data);
        var label = data[0];
        var bsd = data[1];
        // res.render(Path,{branch_data:data});
        res.render(Path,{message1 : req.flash('message1'),label_data : label,bsd_data : bsd});
      })

      // res.render();
    } else {
      var Path = path.join(__dirname, "..", "views", "login");
      res.render(Path);
    }
  },
};
