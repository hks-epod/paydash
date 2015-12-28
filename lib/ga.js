'use strict';

var google = require('googleapis');

var key = require('../config/keys/Harvard-d43656d34c3d');
var jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/drive.readonly'], null);

jwtClient.authorize(function(err, tokens) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('authenticated');


});
