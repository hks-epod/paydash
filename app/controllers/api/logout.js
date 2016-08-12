'use strict';

var Boom = require('boom');

exports.postForm = {
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false
        }
    },
    handler: function(request, reply) {

        request.cookieAuth.clear();

        return reply({
            "statusCode": 200,
            "message": "Successfully logged out."
        });
    }
};
