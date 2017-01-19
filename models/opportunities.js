var mysql = require('../functions/mysql_db.js');
var moment = require('moment');

exports.getListOpportunities = function(role, user_id, cb) {
    var query = "";
    if(role !== "1") { /* modify this for CSV roles */
        //user role, so filter the list of opportunities
        query = "SELECT * FROM opportunity WHERE isDeleted = 0 AND (user_id = " + user_id + " OR assigned_to = " + user_id + ")";
    } else {
        //admin role, so show the list of all opportunities
        query = "SELECT * FROM opportunity WHERE isDeleted = 0";
    }
    mysql.executeQuery(query, function(result) {
        //fetch sale cycle also
        mysql.executeQuery("SELECT * FROM sales_cycle", function(result2) {
            //fetch sale cycle also
            mysql.executeQuery("SELECT id, first_name, last_name FROM user", function(result3) {
                cb({ result: result, result2: result2, result3: result3 }); 
            });
        });
    });
};

exports.getOpportunity = function(id, cb) {
    mysql.executeQuery("SELECT * FROM opportunity WHERE id = " + id, function(result) { cb({ result: result }); })
}

exports.summarizePerSCS = function(cb) {
    mysql.executeQuery("SELECT o.sc_stage, sc.name, sc.description, COUNT(*) AS 'count_opportunities', SUM(o.total_revenue) AS 'sum_total_revenue', SUM(o.gross_profit) AS 'sum_gross_profit', SUM(o.budget) AS 'sum_budget' FROM opportunity o JOIN sales_cycle sc ON o.sc_stage = sc.id WHERE o.isDeleted = 0 GROUP BY o.sc_stage ORDER BY sc.id ASC", function(result) { cb({ result: result }); });
};

exports.addOpportunity = function(user_id, color, project_name, cb) {
    var date_created = moment().format('YYYY-MM-DD HH:mm:ss');
    mysql.executeQuery("INSERT INTO opportunity(user_id, color, project_name, sc_stage, date_created) VALUES('" + user_id + "', '" + color + "', '" + project_name + "', 1, '" + date_created + "')", function(result) { cb({ result: result }); });
};

exports.editOpportunity = function(query, id, cb) {
    var date_modified = moment().format('YYYY-MM-DD HH:mm:ss');
    mysql.executeQuery("UPDATE opportunity SET " + query + " , date_modified = '" + date_modified + "' WHERE id = " + id, function(result) { cb({ result: result }); });    
};

exports.deleteOpportunity = function(opp_id, cb) {
    mysql.executeQuery("UPDATE opportunity SET isDeleted = 1 WHERE id = " + opp_id, function(result) { cb({ result: result }); });
};