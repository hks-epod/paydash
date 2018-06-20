'use strict';

var Boom = require('boom');
var Joi = require('joi');
var crypto = require('crypto');

exports.postForm = {
    description: 'Post to the login page',
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false
        }
    },
    validate: {
        payload: {
            // payload for POST, query for GET
            username: Joi.string().min(3).max(20),
            password: Joi.string().min(6).max(20),
            google_account: Joi.string().min(6).max(60).optional()
        },
        failAction: function(request, reply, source, error) {
            // Username, passowrd minimum validation failed
            return reply(Boom.badRequest('Invalid username or password. Please check your login details and try again.'));
        }
    },
    handler: function(request, reply) {
        if (request.auth.isAuthenticated) {
            return reply(request.auth.credentials);
        }
        var User = request.server.plugins.sequelize.db.User;
        User.findOne({
            where: {
                username: request.payload.username,
                password: crypto.createHash('md5').update(request.payload.password).digest('hex')
            }
        }).then(function(user) {
            // If user account is deactivated
            if (user && user.deactivated) {
                return reply(Boom.badRequest('User account deactivated'));
            } else if (user && user.type === 'test') {
                // If user is test or pilot
                request.cookieAuth.set(user);
                delete user.password;
                return reply(user);
            } else if (user && user.google_account === request.payload.google_account) {
                // If user has correct google account info
                request.cookieAuth.set(user);
                delete user.password;
                return reply(user);
            } else if (user && !user.google_account) {
                // If user does not have google account
                user
                    .update({ google_account: request.payload.google_account })
                    .then(function(user) {
                        request.cookieAuth.set(user);
                        delete user.password;
                        return reply(user);
                    });
            } else if (
                user &&
                user.google_account &&
                user.google_account !== request.payload.google_account
            ) {
                // If google account info provided is not same as user's
                return reply(Boom.badRequest('Google account does not match'));
            } else if (!user) {
                // User not found in database
                return reply(Boom.badRequest('Username/password combination not found'));
            } else {
                return reply(Boom.badRequest('An internal error occurred. Please try again and contact the PayDash team if this error persists.'))
            }
        });
    }
};
