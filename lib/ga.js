'use strict';

var google = require('googleapis');
var key = require('../config/keys/Harvard-d43656d34c3d');
var jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/analytics.readonly'], null);
var analytics = google.analytics('v3');

exports.register = function(plugin, options, next) {

    // Expose jwtclient
    var ga = {
        analytics: analytics,
        jwtclient: jwtClient
    };
    plugin.expose('ga', ga);
    next();
};

exports.register.attributes = {
    name: 'ga',
    version: require('../package.json').version
};



// jwtClient.authorize(function(err, tokens) {
//     if (err) {
//         return;
//     }

//     console.log('authenticated');

//     analytics.data.ga.get({
//         auth: jwtClient,
//         'ids': 'ga:73657543',
//         'metrics': 'ga:users,ga:sessionsPerUser,ga:pageviews,ga:sessions,ga:avgSessionDuration',
//         'dimensions': 'ga:date',
//         'start-date': '2015-01-01',
//         'end-date': '2015-03-09'
//     }, function(err, response) {
//         console.log(response);
//     });

//     analytics.data.ga.get({
//         auth: jwtClient,
//         'ids': 'ga:73657543',
//         'metrics': 'ga:pageviews,ga:avgTimeOnPage',
//         'dimensions':'ga:date,ga:pagePath',
//         'start-date': '2015-01-01',
//         'end-date': '2015-03-09'
//     }, function(err, response) {
//         console.log(response);
//     });
// });
