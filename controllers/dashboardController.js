const session = require("express-session");
const path = require("path");

module.exports = {
  get: (req, res) => {
    var session = req.session;
    
    if (session.userid !=null) 
    {
        var Path = path.join(__dirname, "..", "views", "index.html");
        res.sendFile(Path);

    } else 
    {
      var Path = path.join(__dirname, "..", "views", "login.html");
      res.sendFile(Path);
    }
  },
};
