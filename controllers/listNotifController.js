const pool = require("../models/dbConnect");
module.exports = {
  get: (req, res) => {
    res.render("login");
  },
  show: (request, response) => {
    var action = request.body.action;

    if (action == "fetch") {
      var qry = "SELECT * FROM user_message ORDER BY message_id DESC";
      pool.query(qry, function (error, data) {
        if (error) {
          throw error;
        }
        response.json({
          data: data,
        });
      });
    }
  },
};
