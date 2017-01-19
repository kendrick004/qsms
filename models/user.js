var mysql = require('../functions/mysql_db.js');

exports.checkUser = function(username, done) {
    var sql = "SELECT u.*, r.name AS 'role_name', r.role_description, d.name AS 'department_name', d.department_description FROM USER u JOIN role r JOIN department d ON u.roles = r.id AND u.department = d.id WHERE username = ?";
	var inserts = [username];
	sql = mysql.mysql.format(sql, inserts);
	mysql.get().query(sql,
		function(err, rows, fields) {
            var result = {
                rows: [],
                status: 0,
                err: err,
                msg: ''
            }
            if (err){
                done(err);
            }
			done({result: result});
		}
	);
};

exports.updateProfile = function(query, id, cb) {
    mysql.get().query("UPDATE user SET " + query + " WHERE id = " + id, function(result) { cb({ result: result }); });    
};