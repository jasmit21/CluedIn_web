const session = require("express-session");
const path = require("path");
var flash  = require('connect-flash');

module.exports = {
  get: (req, res) => {
    var session = req.session;

    if (session.userid != null) {
      var Path = path.join(__dirname, "..", "views", "index");
      res.render(Path,{message1 : req.flash('message1')});
    } else {
      var Path = path.join(__dirname, "..", "views", "login");
      res.render(Path);
    }
  },
};
