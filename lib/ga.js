'use strict';

var google = require('googleapis');

var key = require('../config/keys/Harvard-d43656d34c3d');
var jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/analytics.readonly'], null);
var analytics = google.analytics('v3');


jwtClient.authorize(function(err, tokens) {
    if (err) {
        return;
    }

    console.log('authenticated');

    analytics.data.ga.get({
        auth: jwtClient,
        'ids': 'ga:73657543',
        'metrics': 'ga:pageviews,ga:sessions',
        'start-date': '2015-01-01',
        'end-date': '2015-03-09'
    }, function(err, response) {
        // handle the errors (if any)
        // handle the response
        console.log(response);
    });


});
