var express = require('express'),
    http = require('http'),
    path = require('path');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

var index = require('./routes/index'),
    opportunities = require('./routes/opportunities'),
    profile = require('./routes/profile')
    login = require('./routes/login'),
    logout = require('./routes/logout');

var mysql = require('./functions/mysql_db');

var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');

// session for express
app.use(session({secret:'qsms', resave:false, saveUninitialized: true}));

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// development only
if('development' == app.get('env')) {
	app.use(errorHandler());
}

app.use('/', index);
app.use('/opportunities', opportunities);
app.use('/profile', profile);
app.use('/login', login);
app.use('/logout',logout);

mysql.testConnection();

var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});