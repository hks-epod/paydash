'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Crypto = require('crypto');

exports.postChangePassword = {
    description: 'Password change api',
    validate: {
        payload: {
            oldPassword: Joi.string().min(6).max(20).required(),
            newPassword: Joi.string().min(6).max(20).required(),
            verify: Joi.string().required()
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

        if (request.payload.newPassword !== request.payload.verify) {
            return reply(Boom.badRequest('New password does not match'));
        }
        var User = request.server.plugins.sequelize.db.User;

        User.findOne({
            where: {
                username: request.auth.credentials.username,
                password: Crypto.createHash('md5').update(request.payload.oldPassword).digest('hex')
            }
        }).then(function(user) {
            if (user) {
                user
                    .update({
                        password: Crypto.createHash('md5')
                            .update(request.payload.newPassword)
                            .digest('hex')
                    })
                    .then(function() {
                        request.cookieAuth.clear();

                        var msg = {
                            statusCode: 200,
                            message: 'Password changed successfully. Please login with new password'
                        };
                        return reply(msg);
                    });
            } else {
                // User not fond in database
                return reply(Boom.badRequest('Old password is incorrect'));
            }
        });
    }
};
