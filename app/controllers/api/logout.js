'use strict';

var Boom = require('boom');

exports.postForm = {
    auth: {
        strategy: 'standard'
    },
    handler: function(request, reply) {
        request.auth.session.clear();
        return reply(Boom.create(200, 'Successfully logged out'));
    }
};
