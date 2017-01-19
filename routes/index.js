var express = require('express');
var router = express.Router();
var opportunities = require('../models/opportunities');
var numeral = require('numeral');

router.get('/', function(request, response, next) {
    if(request.session.login) {
        opportunities.summarizePerSCS(function(result) {
            var data = {
                numeral: numeral,
                page: {
                    title: "QSMS | Dashboard",
                    name: "Dashboard"
                },
                user: request.session.login,
                scs_summary: result.result
            };
            // response.send(data);
            response.render('index.html', data);
        });
    } else {
        response.redirect('login');
    }
});

module.exports = router;