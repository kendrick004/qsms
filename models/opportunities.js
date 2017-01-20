var db = require('../functions/mysql_db.js');
var moment = require('moment');

exports.getListOpportunities = function(role, user_id, done) {
    var query = "";
    if(role !== "1") { /* modify this for CSV roles */
        //user role, so filter the list of opportunities
        query = "SELECT * FROM opportunity WHERE isDeleted = 0 AND (user_id = " + user_id + " OR assigned_to = " + user_id + ")";
    } else {
        //admin role, so show the list of all opportunities
        query = "SELECT * FROM opportunity WHERE isDeleted = 0";
    }
    db.get().query(query, function(err1, rows1, fields1) {
        if(!err1) {
            //fetch sale cycle also
            db.get().query("SELECT * FROM sales_cycle", function(err2, rows2, fields2) {
                if(!err2) {
                    //fetch sale cycle also
                    db.get().query("SELECT id, first_name, last_name FROM user", function(err3, rows3, fields3) {
                        if(!err3) {
                            var result = {
                                status: err1 ? 0 : 1,
                                msg: err1,
                                rows: rows1
                            };
                            var result2 = {
                                status: err2 ? 0 : 1,
                                msg: err2,
                                rows: rows2
                            };
                            var result3 = {
                                status: err3 ? 0 : 1,
                                msg: err3,
                                rows: rows3
                            };
                            done({ result: result, result2: result2, result3: result3 }); 
                        } else {
                            var result = {
                                status: err2 ? 0 : 1,
                                msg: err2,
                                rows: rows2
                            };
                            done({ result: result });                            
                        }
                    });
                } else {
                    var result = {
                        status: err2 ? 0 : 1,
                        msg: err2,
                        rows: rows2
                    };
                    done({ result: result });            
                }
            });
        } else {
            var result = {
                status: err1 ? 0 : 1,
                msg: err1,
                rows: rows1
            };
            done({ result: result });            
        }
    });
};

exports.getOpportunity = function(id, done) {
    db.get().query("SELECT * FROM opportunity WHERE id = " + id, function(err, rows, fields) {
        var result = {
            status: err ? 0 : 1,
            msg: err,
            rows: rows
        }
        done({ result: result });
    });
}

exports.summarizePerSCS = function(done) {
    db.get().query("SELECT o.sc_stage, sc.name, sc.description, COUNT(*) AS 'count_opportunities', SUM(o.total_revenue) AS 'sum_total_revenue', SUM(o.gross_profit) AS 'sum_gross_profit', SUM(o.budget) AS 'sum_budget' FROM opportunity o JOIN sales_cycle sc ON o.sc_stage = sc.id WHERE o.isDeleted = 0 GROUP BY o.sc_stage ORDER BY sc.id ASC", function(err, rows, fields) {
        var result = {
            status: err ? 0 : 1,
            msg: err,
            rows: rows
        }
        done({ result: result });
    });
};

exports.addOpportunity = function(user_id, color, project_name, done) {
    var date_created = moment().format('YYYY-MM-DD HH:mm:ss');
    db.get().query("INSERT INTO opportunity(user_id, color, project_name, sc_stage, date_created) VALUES('" + user_id + "', '" + color + "', '" + project_name + "', 1, '" + date_created + "')", function(err, rows, fields) {
        var result = {
            status: err ? 0 : 1,
            msg: err,
            rows: rows
        }
        done({ result: result });
    });
};

exports.editOpportunity = function(query, id, done) {
    var date_modified = moment().format('YYYY-MM-DD HH:mm:ss');
    db.get().query("UPDATE opportunity SET " + query + " , date_modified = '" + date_modified + "' WHERE id = " + id, function(err, rows, fields) {
        var result = {
            status: err ? 0 : 1,
            msg: err,
            rows: rows
        }
        done({ result: result });
    });    
};

exports.deleteOpportunity = function(opp_id, done) {
    db.get().query("UPDATE opportunity SET isDeleted = 1 WHERE id = " + opp_id, function(err, rows, fields) {
        var result = {
            status: err ? 0 : 1,
            msg: err,
            rows: rows
        }
        done({ result: result });
    });
};