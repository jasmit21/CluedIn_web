const pool = require('../models/dbConnect');

module.exports = {
    get: (request, response, next) => {
        var draw = request.query.draw;

        var start = request.query.start;

        var length = request.query.length;

        var order_data = request.query.order;

        if (typeof order_data == 'undefined') {
            var column_name = 'user_message.message_id';

            var column_sort_order = 'desc';
        }
        else {
            var column_index = request.query.order[0]['column'];
            console.log(column_index);

            var column_name = request.query.columns[column_index]['data'];
            console.log(column_name);

            var column_sort_order = request.query.order[0]['dir'];
        }

        //search data

        var search_value = request.query.search['value'];

        var search_query = `
         AND (message_title LIKE '%${search_value}%' 
          OR user_message LIKE '%${search_value}%' 
          OR dateOfExpiration LIKE '%${search_value}%' 
          OR scheduled_date LIKE '%${search_value}%'
          OR category LIKE '%${search_value}%'
         )
        `;

        //Total number of records without filtering

        pool.query("SELECT COUNT(*) AS Total FROM user_message", function (error, data) {

            var total_records = data[0].Total;
            // console.log(total_records);

            //Total number of records with filtering

            pool.query(`SELECT COUNT(*) AS Total FROM user_message WHERE 1 ${search_query}`, function (error, data) {

                var total_records_with_filter = data[0].Total;

                var query = `
                SELECT * FROM user_message 
                WHERE 1 ${search_query} 
                ORDER BY ${column_name} ${column_sort_order} 
                LIMIT ${start}, ${length}
                `;

                var data_arr = [];

                pool.query(query, function (error, data) {

                    data.forEach(function (row) {
                        data_arr.push({
                            'message_title': row.message_title,
                            'user_message': row.user_message,
                            'dateOfExpiration': row.dateOfExpiration,
                            'scheduled_date': row.scheduled_date,
                            'category': row.category
                        });
                    });

                    var output = {
                        'draw': draw,
                        'iTotalRecords': total_records,
                        'iTotalDisplayRecords': total_records_with_filter,
                        'aaData': data_arr

                    };

                    response.json(output);

                });

            });

        });
    }
}