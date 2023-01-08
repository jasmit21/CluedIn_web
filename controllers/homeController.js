const session = require("express-session");
const path = require("path");

module.exports = {
  get: (req, res) => {
    // console.log(res.sendFile('views/Index.html', { root: '.' }));
    let session = req.session;
    if (session.userid) {
      res.redirect("/dashboard");
    } else {
      var Path = path.join(__dirname, "..", "views", "login");
      res.render(Path, { Emsg: req.flash("Emsg") });
    }
  },
};