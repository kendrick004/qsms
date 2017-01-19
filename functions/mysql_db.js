var mysql = require('mysql')
  , async = require('async');

var db_name = 'ad_7a7185b21d0a2ae';

var PRODUCTION_DB = db_name;
var TEST_DB = db_name;

exports.MODE_TEST = db_name;
exports.MODE_PRODUCTION = db_name;

// mysql://admin:YAMEBRBJPNCOEYBL@sl-us-dal-9-portal.0.dblayer.com:18514/compose

// var config = {
//     host: 'localhost',
//     user: 'root',
//     password: 'incorrect',
//     port: 3306
// };


var config = {
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'b7551b781ed3ea',
    password: 'e1756c85',
    name: 'ad_7a7185b21d0a2ae',
    port: 3306
};


var state = {
  pool: null,
  mode: null
};
exports.mysql = mysql;

exports.connect = function(mode, done) {

  state.pool = mysql.createPool({
    connectionLimit : 100, //important
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.name,
    port: config.port
  });
  
  state.mode = mode;
  done();
}

exports.get = function() {
  return state.pool;
}

exports.fixtures = function(data) {
  var pool = state.pool;
  if (!pool) return done(new Error('Missing database connection.'));

  var names = Object.keys(data.tables);
  async.each(names, function(name, cb) {
    async.each(data.tables[name], function(row, cb) {
      var keys = Object.keys(row)
        , values = keys.map(function(key) { return "'" + row[key] + "'" })

      pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
    }, cb);
  }, done);
};

exports.drop = function(tables, done) {
  var pool = state.pool;
  if (!pool) return done(new Error('Missing database connection.'));

  async.each(tables, function(name, cb) {
    pool.query('DELETE * FROM ' + name, cb);
  }, done);
};