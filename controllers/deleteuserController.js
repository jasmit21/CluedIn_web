const pool = require("../models/dbConnect");

module.exports= {
    delete:(req,res)=>{
        var id = req.query.id;
        console.log("id:",id);
		var query = `UPDATE user_details SET isDisabled = 1 WHERE user_id = "${id}"`;

		pool.query(query, function(error, data){
            if (error) 
            {
                throw error    
            }
            console.log("deleted psw");
			res.json({
				message : 'Data Deleted'
			});

		});
    }
}