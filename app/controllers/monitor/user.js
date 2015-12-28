'use strict';
var d3 = require('d3');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('monitor/user');
    }
};

exports.getData = {
    handler: function(request, reply) {

        var analytics = request.server.plugins.ga.analytics;
        var jwtClient = request.server.plugins.ga.jwtClient;
        console.log(jwtClient);
        jwtClient.authorize(function(err, tokens) {
            if (err) {
                return;
            }
            console.log('authenticated');
            analytics.data.ga.get({
                auth: jwtClient,
                'ids': 'ga:73657543',
                'metrics': 'ga:users,ga:sessionsPerUser,ga:pageviews,ga:sessions,ga:avgSessionDuration',
                'dimensions': 'ga:date',
                'start-date': '2015-01-01',
                'end-date': '2015-03-09'
            }, function(err, response) {
                console.log(response);
                reply(response);
            });

            // analytics.data.ga.get({
            //     auth: jwtClient,
            //     'ids': 'ga:73657543',
            //     'metrics': 'ga:pageviews,ga:avgTimeOnPage',
            //     'dimensions':'ga:date,ga:pagePath',
            //     'start-date': '2015-01-01',
            //     'end-date': '2015-03-09'
            // }, function(err, response) {
            //     console.log(response);
            // });

        });


    }
};
