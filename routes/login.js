var express = require('express');
var router = express.Router();
var user = require('../models/user');
var pw = require('../functions/password.js');

/* this is for the creation of hash password only... delete this if not used anymore */
// router.post('/hashMe', function(request, response, next) {
//     response.send(request.body.password + " : " + pw.hash(request.body.password));
// });
// router.post('/validateMe', function(request, response, next) {
//     response.send(request.body.pass + " == " + request.body.hashpass + " is " + pw.validate(request.body.hashpass, request.body.pass));
// });

router.get('/', function(request, response, next) {
    if(!request.session.login) {
        var data = {
            page: {
                title: "QSMS | Log In",
                name: "Login"
            }
        };
        response.render('login.html', data);
    } else {
        response.redirect('/');
    }
});

//AJAX Login Request
router.post('/', function(request, response, next) {
    user.checkUser(request.body.username, function(result) {
        var res = result.result;
        if(res.status == 1) {
            if(res.rows.length > 0) {
                if(pw.validate(res.rows[0].password, request.body.password)) {
                    request.session.login = {
                        id: res.rows[0].id,
                        username: res.rows[0].username,
                        email_address: res.rows[0].email_address,
                        first_name: res.rows[0].first_name,
                        middle_name: res.rows[0].middle_name,
                        last_name: res.rows[0].last_name,
                        roles: res.rows[0].roles,
                        role_name: res.rows[0].role_name,
                        role_description: res.rows[0].role_description,
                        department: res.rows[0].department,
                        department_name: res.rows[0].department_name,
                        department_description: res.rows[0].department_description,
                        date_created: res.rows[0].date_created
                    };
                    var cb = {
                        success: 1,
                        msg: 'Login Success!'
                    };
                    response.send(JSON.stringify(cb));
                } else {
                    var cb = {
                        success: 0,
                        msg: 'Username or password is incorrect.'
                    };
                    response.send(JSON.stringify(cb));
                }
            } else {
                var cb = {
                    success: 0,
                    msg: 'Username or password is incorrect.'
                };
                response.send(JSON.stringify(cb));
            }
        } else {
            response.send("Something bad happened. Try again.");
        }
    })
});

module.exports = router;