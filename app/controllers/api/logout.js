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
        var User = request.server.plugins.sequelize.db.User;

        User.findOne({
            where: {
                username: request.auth.credentials.username
            }
        }).then(function(user) {
            if (user) {
                user
                    .update({
                        notification_token: null
                    })
                    .then(function() {
                        request.cookieAuth.clear();

                        var msg = {
                            statusCode: 200,
                            message: 'Successfully logged out.'
                        };
                        return reply(msg);
                    });
            } else {
                return reply(Boom.badRequest('Something went wrong'));
            }
        });
    }
};
