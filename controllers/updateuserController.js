const pool = require("../models/dbConnect");

module.exports = {
  update: (req, res) => {
    //storing data retrieved from the modal into local variables

    var id = req.query.id; //hidden field data

    //var "local-var" = name of the input field of modal which is retrieved using req.body
    var user_fname = req.query.user_fname;
    var user_lname = req.query.user_lname;
    var user_mobno = req.query.user_mobno;
    var user_email = req.query.user_email;
    var user_gender = req.query.user_gender;
    var user_addr = req.query.user_addr;
    var user_pincode = req.query.user_pincode;
    console.log("updated data : ", user_mobno);

    var qry = `
        UPDATE user_details
        SET user_fname = "${user_fname}",
        user_lname = "${user_lname}",
        user_mobno = "${user_mobno}",
        user_email = "${user_email}",
        user_gender = "${user_gender}",
        user_addr = "${user_addr}",
        user_pincode = "${user_pincode}"
        WHERE user_id = "${id}"
        `;

    pool.query(qry, (err, data) => {
      if (err) throw err;
      console.log("Data updated successfully");
      res.redirect("/createUser");
    });
  },
};
