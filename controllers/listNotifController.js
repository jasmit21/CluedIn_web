const pool = require("../models/dbConnect");
module.exports = {
  get: (req, res) => {
    res.render("login");
  },
};
