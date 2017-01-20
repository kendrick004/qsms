var db = require('../functions/mysql_db.js');

exports.checkUser = function(username, done) {
    var sql = "SELECT u.*, r.name AS 'role_name', r.role_description, d.name AS 'department_name', d.department_description FROM USER u JOIN role r JOIN department d ON u.roles = r.id AND u.department = d.id WHERE username = ?";
	var inserts = [username];
	sql = db.mysql.format(sql, inserts);
	db.get().query(sql,
	    function(err, rows, fields) {
            var result = {
                status: err ? 0 : 1,
                msg: err,
                rows: rows
            }
            done({ result: result });
		}
	);
};

exports.updateProfile = function(query, id, done) {
    db.get().query("UPDATE user SET " + query + " WHERE id = " + id, function(err, rows, fields) {
        var result = {
            status: err ? 0 : 1,
            msg: err,
            rows: rows
        }
        done({ result: result });
    });    
};