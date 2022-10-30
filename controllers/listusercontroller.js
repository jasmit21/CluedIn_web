const pool = require("../models/dbConnect");

module.exports = {
  list: (req, res) => {
    var action = req.body.action;
    console.log("hiii");
    if (action == "fetch") {
      console.log("hiii action = fetch");
      var qry =
        "SELECT user_id,user_fname,user_lname,user_mobno,user_email,user_gender,user_role_id,user_department,user_addr,user_pincode FROM user_details WHERE isDisabled = 0 ";
      pool.query(qry, function (error, data) {
        if (error) {
          throw error;
        }
        res.json({
          data: data,
        });
      });
    }
    if (action == "fetch_single") {
      console.log("hiii fetch_single");
      var id = req.body.id;
      var query = `SELECT user_id,user_fname,user_lname,user_mobno,user_email,user_gender,user_addr,user_pincode FROM user_details WHERE user_id = "${id}"`;
      pool.query(query, function (err, data) {
        if (err) throw err;
        console.log(data);
        res.json(data[0]);
        console.log(data[0]);
      });
    }
    if (action == "Edit") {
      //storing data retrieved from the modal into local variables

      var id = req.body.id; //hidden field data

      //var "local-var" = name of the input field of modal which is retrieved using req.body
      var user_fname = req.body.data.user_fname;
      var user_lname = req.body.user_lname;
      var user_mobno = req.body.user_mobno;
      var user_email = req.body.user_email;
      var user_gender = req.body.user_gender;
      var user_addr = req.body.user_addr;
      var user_pincode = req.body.user_pincode;
      console.log("updated data : ", user_mobno);
      //query
      var qry = `
        UPDATE user_details
        SET user_fname = "${user_fname}",
        user_lname = "${user_lname}",
        user_mobno = "${user_mobno}",
        user_email = "${user_email}",
        user_gender = "${user_gender}",
        user_addr = "${user_addr}",
        user_pincode = "${user_pincode}",
        WHERE user_id = "${id},
        `;

      pool.query(qry, (err, data) => {
        if (err) throw err;
        console.log("Data updated successfully");
        res.json({
          message: "Data Edited",
        });
      });
    }
  },
};
