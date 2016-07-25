'use strict';

var Boom = require('boom');
var Joi = require('joi');
var crypto = require('crypto');

var lockoutInterval = 60; // seconds
var maxAttemptsBeforeLockout = 5;

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
            password: Joi.string().min(6).max(20)
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
            if (user) {
                request.cookieAuth.set(user);
                delete user.password;
                return reply(user);
            } else {
                // User not fond in database
                return reply(Boom.badRequest('Invalid username or password'));
            }
        });
    }
};
