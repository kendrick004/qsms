var express = require('express');
var router = express.Router();
var opportunities = require('../models/opportunities');

router.get('/', function(request, response, next) {
    if(request.session.login) {
        opportunities.getListOpportunities(request.session.login.roles, request.session.login.id, function(result) {
            var data = {
                page: {
                    title: "QSMS | Opportunities",
                    name: "Opportunities"
                },
                user: request.session.login,
                opportunities: result.result,
                sales_cycle: result.result2,
                users: result.result3
            };
            response.render('opportunities.html', data);
        });    
    } else {
        response.redirect('login');
    }
});

//AJAX Get Request
router.post('/opportunity', function(request, response, next) {
    opportunities.getOpportunity(request.body.id, function(result) {
        if(result.result.status == 1) {
            var cb = {
                success: 1,
                opportunity: result.result.rows[0]
            };
            response.send(JSON.stringify(cb));
        } else {
            response.send("Something wrong happened when getting the opportunity. Error: " + result.result.err);
        }        
    });
});

//AJAX Add Request
router.post('/add', function(request, response, next) {
    opportunities.addOpportunity(request.session.login.id, request.body.color, request.body.project_name, function(result) {
        if(result.result.status == 1) {
            var cb = {
                success: 1,
                insert_id: result.result.rows.insertId
            };
            response.send(JSON.stringify(cb));
        } else {
            response.send("Something wrong happened when adding the opportunity. Error: " + result.result.err);
        }
    });
});

//AJAX Edit Request
router.post('/edit', function(request, response, next) {
    var query_validation = "";
    if(request.body.color !== undefined) { request.body.color != "" ? query_validation += "color = '" + request.body.color + "', " : query_validation += "color = NULL, "; }
    if(request.body.project_name !== undefined) { request.body.project_name != "" ? query_validation += "project_name = '" + request.body.project_name + "', " : query_validation += "project_name = NULL, "; }
    if(request.body.project_description !== undefined) { request.body.project_description != "" ? query_validation += "project_description = '" + request.body.project_description + "', " : query_validation += "project_description = NULL, "; }
    if(request.body.project_type !== undefined) { request.body.project_type != "" ? query_validation += "project_type = '" + request.body.project_type + "', " : query_validation += "project_type = NULL, "; }
    if(request.body.total_revenue !== undefined) { request.body.total_revenue != "" ? query_validation += "total_revenue = " + request.body.total_revenue + ", " : query_validation += "total_revenue = NULL, "; }
    if(request.body.gross_profit !== undefined) { request.body.gross_profit != "" ? query_validation += "gross_profit = " + request.body.gross_profit + ", " : query_validation += "gross_profit = NULL, "; }
    if(request.body.company !== undefined) { request.body.company != "" ? query_validation += "company = '" + request.body.company + "', " : query_validation += "company = NULL, "; }
    if(request.body.industry !== undefined) { request.body.industry != "" ? query_validation += "industry = '" + request.body.industry + "', " : query_validation += "industry = NULL, "; }
    if(request.body.address !== undefined) { request.body.address != "" ? query_validation += "address = '" + request.body.address + "', " : query_validation += "address = NULL, "; }
    if(request.body.contact_person !== undefined) { request.body.contact_person != "" ? query_validation += "contact_person = '" + request.body.contact_person + "', " : query_validation += "contact_person = NULL, "; }
    if(request.body.designation !== undefined) { request.body.designation != "" ? query_validation += "designation = '" + request.body.designation + "', " : query_validation += "designation = NULL, "; }
    if(request.body.contact_no !== undefined) { request.body.contact_no != "" ? query_validation += "contact_no = '" + request.body.contact_no + "', " : query_validation += "contact_no = NULL, "; }
    if(request.body.email_address !== undefined) { request.body.email_address != "" ? query_validation += "email_address = '" + request.body.email_address + "', " : query_validation += "email_address = NULL, "; }
    if(request.body.lead_from !== undefined) { request.body.lead_from != "" ? query_validation += "lead_from = '" + request.body.lead_from + "', " : query_validation += "lead_from = NULL, "; }
    if(request.body.assigned_to !== undefined) { request.body.assigned_to != "" ? query_validation += "assigned_to = " + request.body.assigned_to + ", " : query_validation += "assigned_to = NULL, "; }
    if(request.body.sc_stage !== undefined) { request.body.sc_stage != "" ? query_validation += "sc_stage = " + request.body.sc_stage + ", " : query_validation += "sc_stage = NULL, "; }
    if(request.body.budget !== undefined) { request.body.budget != "" ? query_validation += "budget = " + request.body.budget + ", " : query_validation += "budget = NULL, "; }
    if(request.body.business_need !== undefined) { request.body.business_need != "" ? query_validation += "business_need = '" + request.body.business_need + "', " : query_validation += "business_need = NULL, "; }
    if(request.body.authority !== undefined) { request.body.authority != "" ? query_validation += "authority = '" + request.body.authority + "', " : query_validation += "authority = NULL, "; }
    if(request.body.timeline !== undefined) { request.body.timeline != "" ? query_validation += "timeline = '" + request.body.timeline + "', " : query_validation += "timeline = NULL, "; }

    query_validation = query_validation.substring(0, query_validation.length - 2);

    opportunities.editOpportunity(query_validation, request.body.id, function(result) {
        if(result.result.status == 1) {
            var cb = { success: 1 };
            response.send(JSON.stringify(cb));
        } else {
            response.send("Something wrong happened when updating the opportunity. Error: " + result.result.err);
        }        
    });
});

//AJAX Delete Request
router.post('/delete', function(request, response, next) {
    opportunities.deleteOpportunity(request.body.id, function(result) {
        if(result.result.status == 1) {
            var cb = { success: 1 };
            response.send(JSON.stringify(cb));
        } else {
            response.send("Something wrong happened when deleting the opportunity. Error: " + result.result.err);
        }
    });
});

module.exports = router;