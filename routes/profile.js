var express = require('express');
var router = express.Router();
var user = require('../models/user');
var opportunities = require('../models/opportunities');
var pw = require('../functions/password.js');

router.get('/', function(request, response, next) {
    if(request.session.login) {
        opportunities.getListOpportunities(request.session.login.roles, request.session.login.id, function(result) {
            var data = {
                page: {
                    title: "QSMS | Profile",
                    name: "Profile"
                },
                user: request.session.login,
                opportunities: result.result,
            };
            response.render('profile.html', data);
        });
    } else {
        response.redirect('login');
    }
});

router.post('/update', function(request, response, next) {
    var query_validation = "";
    if(request.body.username !== undefined) { request.body.username != "" ? query_validation += "username = '" + request.body.username + "', " : query_validation += "username = NULL, "; }
    if(request.body.password !== undefined) { request.body.password != "" ? query_validation += "password = '" + pw.hash(request.body.password) + "', " : query_validation += "password = NULL, "; }
    if(request.body.email_address !== undefined) { request.body.email_address != "" ? query_validation += "email_address = '" + request.body.email_address + "', " : query_validation += "email_address = NULL, "; }
    if(request.body.first_name !== undefined) { request.body.first_name != "" ? query_validation += "first_name = '" + request.body.first_name + "', " : query_validation += "first_name = NULL, "; }
    if(request.body.middle_name !== undefined) { request.body.middle_name != "" ? query_validation += "middle_name = '" + request.body.middle_name + "', " : query_validation += "middle_name = NULL, "; }
    if(request.body.last_name !== undefined) { request.body.last_name != "" ? query_validation += "last_name = '" + request.body.last_name + "', " : query_validation += "last_name = NULL, "; }
    if(request.body.roles !== undefined) { request.body.roles != "" ? query_validation += "roles = '" + request.body.roles + "', " : query_validation += "roles = NULL, "; }
    if(request.body.department !== undefined) { request.body.department != "" ? query_validation += "department = '" + request.body.department + "', " : query_validation += "department = NULL, "; }

    query_validation = query_validation.substring(0, query_validation.length - 2);

    user.updateProfile(query_validation, request.body.id, function(result) {
        if(result.result.status == 1) {
            //update session
            request.session.login = {
                id: request.body.id,
                username: request.body.username,
                email_address: request.body.email_address,
                first_name: request.body.first_name,
                middle_name: request.body.middle_name,
                last_name: request.body.last_name,
                roles: request.session.login.roles, /* change this until: */
                role_name: request.session.login.role_name,
                role_description: request.session.login.role_description,
                department: request.session.login.department,
                department_name: request.session.login.department_name,
                department_description: request.session.login.department_description, /* here... */
                date_created: request.session.login.date_created
            };
            
            var cb = { success: 1 };
            response.send(JSON.stringify(cb));
        } else {
            response.send("Something wrong happened when updating the profile. Error: " + result.result.err);
        }        
    });
});

module.exports = router;