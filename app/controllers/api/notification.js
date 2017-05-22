'use strict';

const Joi = require('joi');
const Boom = require('boom');

exports.registerToken = {
    description: 'notification token register api',
    validate: {
        payload: {
            notification_token: Joi.string().min(2).max(1000).required()
        },
        failAction: function(request, reply, source, error) {
            // Boom bad request
            return reply(Boom.badRequest(error));
        }
    },
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
            return Boom.forbidden('You are not logged in');
        }

        var User = request.server.plugins.sequelize.db.User;

        User.findOne({
            where: {
                username: request.auth.credentials.username
            }
        }).then(function(user) {
            if (user) {
                user
                    .update({
                        notification_token: request.payload.notification_token
                    })
                    .then(function() {
                        request.cookieAuth.clear();
                        request.cookieAuth.set(user);
                        var msg = {
                            statusCode: 200,
                            message: 'Token registered successfully.'
                        };
                        return reply(msg);
                    });
            } else {
                return reply(Boom.badRequest('Something went wrong'));
            }
        });
    }
};
