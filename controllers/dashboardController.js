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
      qry = `SELECT * FROM branch WHERE branch_type = 1`
      pool.query(qry,(err,data)=>{
        if (err) {
          throw err;
        }
        // console.log(data);
        // res.render(Path,{branch_data:data});
        res.render(Path,{message1 : req.flash('message1'),branch_data : data});
      })

      res.render();
    } else {
      var Path = path.join(__dirname, "..", "views", "login");
      res.render(Path);
    }
  },
};
