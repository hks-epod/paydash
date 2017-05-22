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
        'hapi-auth-cookie': {
            redirectTo: false
        }
    },
    handler: function(request, reply) {
        if (!request.auth.isAuthenticated) {
            return reply(Boom.forbidden('You are not logged in'));
        }

        var version = request.pre.apiVersion;
        var res = {
            en_US: Translate(
                '/app',
                { lang: 'en_US', role: request.auth.credentials.role },
                version
            ),
            hi: Translate('/app', { lang: 'hi', role: request.auth.credentials.role }, version)
        };

        reply(res);
    }
};
