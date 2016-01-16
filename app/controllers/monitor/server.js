'use strict';

var path = require('path');
var readline = require('readline');
var fs = require('fs');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('monitor/server', null, {
            layout: 'monitor'
        });
    }
};

exports.getData = {
    handler: function(request, reply) {

        var stats = [];
        var statPath = path.resolve(__dirname + '/../../../logs/stats/stats.log');
        var lineReader = readline.createInterface({
            input: fs.createReadStream(statPath)
        });

        lineReader.on('line', function(line) {
            stats.push(JSON.parse(line));
        });

        lineReader.on('close', function() {
            reply(stats);
        });

    }
};

exports.getPageLoadData = {
    handler: function(request, reply) {
        var analytics = request.server.plugins.ga.analytics;
        var jwtClient = request.server.plugins.ga.jwtClient;
        jwtClient.authorize(function(err, tokens) {
            if (err) {
                return;
            }

            analytics.data.ga.get({
                auth: jwtClient,
                'ids': 'ga:73657543',
                'metrics': 'ga:avgPageLoadTime',
                'dimensions':'ga:date,ga:pagePath',
                'start-date': '2015-01-01',
                'end-date': '2016-01-16'
            }, function(err, response) {
                reply(response);
            });

        });
    }
};
