'use strict';

var google = require('googleapis');
var analytics = google.analytics('v3');

exports.register = function(plugin, options, next) {

    var key = require('../config/keys/EPOD-342388bed134');
    var jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/analytics.readonly'], null);
    // Expose jwtclient

    plugin.expose('analytics', analytics);
    plugin.expose('jwtClient', jwtClient);
    next();
};

exports.register.attributes = {
    name: 'ga',
    version: require('../package.json').version
};

