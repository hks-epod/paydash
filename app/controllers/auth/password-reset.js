'use strict';

var Crypto = require('crypto');
var Joi = require('joi');

exports.showResetForm = {
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false // To stop from redirect loop
        }
    },
    validate: {
        params: {
            token: Joi.string().min(2)
        },
        failAction: function(request, reply, source, error) {
            // Boom bad request
            request.yar.flash('error', 'Invalid Token');
            return reply.redirect('/reset-password');
        }
    },
    handler: function(request, reply) {

        var ctx = {};
        var User = request.server.plugins.sequelize.db.User;
        User.findOne({
            where: {
                reset_password_token: request.params.token,
                reset_password_expires: {
                    $gt: Date.now()
                }
            }
        }).then(function(user) {
            if (user) {
                ctx.isValidToken = true;
                return reply.view('auth/password-reset', ctx);
            } else {
                ctx.isValidToken = false;
                return reply.view('auth/password-reset', ctx);    
            }
            
        });

    }
};

exports.postResetForm = {
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false // To stop from redirect loop
        }
    },
    validate: {
        payload: {
            password: Joi.string().min(2).max(20).required(),
            verify: Joi.string().min(2).max(20).required()
        },
        params: {
            token: Joi.string().min(2)
        },
        failAction: function(request, reply, source, error) {
            // Boom bad request
            request.yar.flash('error', 'Bad request');
            return reply.redirect('/reset-password');
        }
    },
    handler: function(request, reply) {

        if (request.payload.password !== request.payload.verify) {
            request.yar.flash('error', ' New Password does not match');
            return reply.redirect('/reset-password');
        }
        var User = request.server.plugins.sequelize.db.User;
        User.findOne({
            where: {
                reset_password_token: request.params.token,
                reset_password_expires: {
                    $gt: Date.now()
                }
            }
        }).then(function(user) {
            if (user) {
                user.update({
                    password : Crypto.createHash('md5').update(request.payload.password).digest('hex'),
                    reset_password_token: null,
                    reset_password_expires: null
                }).then(function() {
                    request.yar.flash('success', 'Password changed successfully. Please login with new password');
                    // TODO : Send password change email
                    request.cookieAuth.clear();
                    return reply.redirect('/login');
                });
            } else {
                // User not fond in database
                request.yar.flash('error', 'Token is invalid');
                return reply.redirect('/reset-password');
            }
        });


    }
};
