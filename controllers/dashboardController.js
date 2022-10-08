const session = require("express-session");
const path = require("path");

module.exports = {
  get: (req, res) => {
    var session = req.session;

    if (session.userid != null) {
      var Path = path.join(__dirname, "..", "views", "index");
      res.render(Path);
    } else {
      var Path = path.join(__dirname, "..", "views", "login");
      res.render(Path);
    }
  },
};
