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
        payload: { // payload for POST, query for GET
            username: Joi.string().min(3).max(20),
            password: Joi.string().min(6).max(20),
            google_account: Joi.string().min(6).max(60).optional()
        },
        failAction: function(request, reply, source, error) {
            // Username, passowrd minimum validation failed
            return reply(Boom.badRequest('Invalid username or password'));
        },
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
            }
            
            // If user is test or pilot 
            else if (user && user.type === 'test' || user.type === 'pilot_one') {
                request.cookieAuth.set(user);
                delete user.password;
                return reply(user);
            }

            // If user has correct google account info
            else if (user && user.google_account === request.payload.google_account) {
                request.cookieAuth.set(user);
                delete user.password;
                return reply(user);

            }

            // If user does not have google account
            else if (user && !user.google_account) {

                user.update({ google_account: request.payload.google_account }).then(function(user) {
                    request.cookieAuth.set(user);
                    delete user.password;
                    return reply(user);
                });
            }

            // If gogole account info provided is not same as user's 
            else if (user && user.google_account && (user.google_account !== request.payload.google_account)) {

                return reply(Boom.badRequest('Google account does not match'));

            }
            
            // User not fond in database
            else {

                return reply(Boom.badRequest('Invalid username or password'));
            }
        });
    }
};
