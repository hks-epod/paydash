'use strict';

const Crypto = require('crypto');
const Joi = require('joi');

exports.showRecoveryForm = {
    auth: {
        mode: 'try',
        strategy: 'standard',
        scope: ['district', 'block', 'editor']
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false // To stop from redirect loop
        }
    },
    handler: function(request, reply) {
        reply.view('auth/password-recovery');
    }
};

exports.postRecoveryForm = {
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
            name_email: Joi.string().min(2).max(50).required()
        },
        failAction: function(request, reply, source, error) {
            // Boom bad request
            request.yar.flash('error', 'Bad request');
            return reply.redirect('/me/settings/profile');
        }
    },
    handler: function(request, reply) {
        // Generate Token
        Crypto.randomBytes(20, function(err, buffer) {
            var token = buffer.toString('hex');
            var query = {};
            if (request.payload.name_email.indexOf('@') > -1) {
                query.email = request.payload.name_email.toLowerCase();
            } else {
                query.username = request.payload.name_email.toLowerCase();
            }

            var User = request.server.plugins.sequelize.db.User;

            //  Find User by username or email
            User.findOne({
                where: query
            }).then(function(user) {
                if (user) {
                    user
                        .update({
                            reset_password_token: token,
                            reset_password_expires: Date.now() + 3600000
                        })
                        .then(function() {
                            var data = {
                                from: 'epodindianrega@gmail.com',
                                to: user.email,
                                subject: 'Password Reset - PayDash',
                                path: 'emails/forgot-password',
                                context: {
                                    name: user.firstname + ' ' + user.lastname,
                                    url:
                                        request.connection.info.protocol +
                                        '://' +
                                        request.info.host +
                                        '/reset-password/' +
                                        token
                                }
                            };
                            //  Send Email
                            var Mailer = request.server.plugins.mailer;
                            Mailer.sendMail(data, function(err, info) {
                                //  Email Sent
                            });
                            request.yar.flash(
                                'success',
                                'An email has sent to your registered email id with password reset instructions'
                            );
                            return reply.redirect('/forgot-password');
                        });
                } else {
                    request.yar.flash('error', 'Invalid username or email');
                }
            });
        });
    }
};
