var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'b7551b781ed3ea',
    password: 'e1756c85',
    database: 'ad_7a7185b21d0a2ae'
});

exports.testConnection = function() {
    connection.connect(function(err) {
        if(!err) {
            console.log("MySQL Connection successful.");
        } else {
            console.log("Error connecting to MySQL.\nError Details: " + err);
        }
    });
};

exports.executeQuery = function(query, cb) {
    connection.query(query, function(err, rows, fields) {
        if(!err) {
            cb({
                status: 1,
                rows: rows,
                err: null
            });
        } else {
            cb({
                status: 0,
                rows: rows,
                err: err
            });
        }
    });
};