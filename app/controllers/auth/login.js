'use strict';

const Boom = require('boom');
const Joi = require('joi');
const Crypto = require('crypto');

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
            return reply.redirect('/overview');
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
            request.yar.flash('error', 'Invalid username or password');
            return reply.redirect('/login');
        },
    },
    handler: function(request, reply) {
        if (request.auth.isAuthenticated && request.auth.scope === 'editor') {
            return reply.redirect('/editor/info');
        } else if (request.auth.isAuthenticated){
            return reply.redirect('/overview');
        }

        var db = request.server.plugins.sequelize.db;
        var User = request.server.plugins.sequelize.db.User;

        User.findOne({
            where: {
                username: request.payload.username,
                password: Crypto.createHash('md5').update(request.payload.password).digest('hex')
            },
            include: [db.user_regions]
        }).then(function(user) {

            if (user) {
                if (user.deactivated) {
                    request.yar.flash('error', 'Your account has been deactivated. Please contact the PayDash team if you require assistance.');
                    return reply.redirect('/login');
                }

                user.super_token = new Date().getTime().toString();
                user.save().then(function() {
                
                    request.cookieAuth.set(user);

                    // Handle Redirection
                    if (user.scope === 'editor') {
                        return reply.redirect('/editor/info');
                    }
                    if (!user.isActive) {

                        request.yar.flash('info', 'Please check your profile details');
                        user.update({ isActive: true }).then(function() {
                            return reply.redirect('/me/settings/profile');
                        });

                    } else {
                        return reply.redirect('/overview');
                    }
                });

            } else {
                // User not fond in database
                request.yar.flash('error', 'Invalid username or password');
                return reply.redirect('/login');
            }
        });

    }
};
