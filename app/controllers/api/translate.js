'use strict';

var queries = require('../../helpers/queries');
var utils = require('../../helpers/utils');
var Translate = require('../../templates/helpers/t');
var Boom = require('boom');


exports.getData = {
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        'crumb': {
            skip: true
        },
        'hapi-auth-cookie': {
            redirectTo: false
        }
    },
    handler: function(request, reply) {

        if (!request.auth.isAuthenticated) {
            return Boom.forbidden('You are not logged in');
        }

        var res = {
            en_US: Translate('/app', { lang: 'en_US' }),
            hi: Translate('/app', { lang: 'hi' })
        };

        reply(res);

    }
};
