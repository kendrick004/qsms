var mysql = require('../functions/mysql_db.js');

exports.checkUser = function(username, cb) {
    mysql.executeQuery("SELECT u.*, r.name AS 'role_name', r.role_description, d.name AS 'department_name', d.department_description FROM USER u JOIN role r JOIN department d ON u.roles = r.id AND u.department = d.id WHERE username = '" + username + "'", function(result) { cb({ result: result }); })
};

exports.updateProfile = function(query, id, cb) {
    mysql.executeQuery("UPDATE user SET " + query + " WHERE id = " + id, function(result) { cb({ result: result }); });    
};