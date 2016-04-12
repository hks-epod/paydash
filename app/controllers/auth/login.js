'use strict';

var Boom = require('boom');
var Joi = require('joi');
var crypto = require('crypto');

var lockoutInterval = 60; // seconds
var maxAttemptsBeforeLockout = 5;


exports.showForm = {
    description: 'Returns the login page',
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false // To stop from redirect loop
        }
    },
    handler: function(request, reply) {

        if (request.auth.isAuthenticated) {
            return reply.redirect('/performance/overview');
        }
        reply.view('auth/login');

    }
};

exports.postForm = {
    description: 'Post to the login page',
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false
        },
        crumb: {
            key: 'crumb',
            source: 'payload', // this tests payload crumb value.
            restful: true // do not need to make Joi validation for crumb.
        }
    },
    validate: {
        payload: { // payload for POST, query for GET
            username: Joi.string().min(3).max(20),
            password: Joi.string().min(6).max(20)
        },
        failAction: function(request, reply, source, error) {
            // Username, passowrd minimum validation failed
            request.session.flash('error', 'Invalid username or password');
            return reply.redirect('/login');
        },
    },
    handler: function(request, reply) {
        if (request.auth.isAuthenticated) {
            return reply.redirect('/performance/overview');
        }
        var db = request.server.plugins.sequelize.db;
        var User = request.server.plugins.sequelize.db.User;
        User.findOne({
            where: {
                username: request.payload.username,
                password: crypto.createHash('md5').update(request.payload.password).digest('hex')
            },
            include: [db.user_regions]
        }).then(function(user) {
            if (user) {
                request.auth.session.set(user);
                if (!user.isActive) {
                    request.session.flash('info', 'Please check your profile details');
                    user.update({
                        isActive: true
                    }).then(function() {
                        return reply.redirect('/me/settings/profile');
                    });
                } else {
                    return reply.redirect('/performance/overview');
                }

            } else {
                // User not fond in database
                request.session.flash('error', 'Invalid username or password');
                return reply.redirect('/login');
            }
        });

    }
};
