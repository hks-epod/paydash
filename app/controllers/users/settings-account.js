'use strict';

const Joi = require('joi');
const Crypto = require('crypto');

exports.showEditAccount = {
    description: 'Show Edit account settings',
    auth: {
        scope: ['block', 'editor', 'district', 'state']
    },
    handler: function(request, reply) {
        reply.view('users/settings-account');
    }
};

exports.postChangePassword = {
    description: 'Password change',
    auth: {
        scope: ['block', 'editor', 'district', 'state']
    },
    plugins: {
        crumb: {
            key: 'crumb',
            source: 'payload',
            restful: true
        }
    },
    validate: {
        payload: {
            oldPassword: Joi.string().min(6).max(20).required(),
            newPassword: Joi.string().min(6).max(20).required(),
            verify: Joi.string().required()
        },
        failAction: function(request, reply, source, error) {
            // Boom bad request
            request.yar.flash('error', 'Bad request');
            return reply.redirect('/signin');
        }
    },
    handler: function(request, reply) {
        if (request.payload.newPassword !== request.payload.verify) {
            request.yar.flash('error', ' New Password does not match');
            return reply.redirect('/me/settings/account');
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
                        request.yar.flash(
                            'success',
                            'Password changed successfully. Please login with new password'
                        );
                        request.cookieAuth.clear();
                        return reply.redirect('/login');
                    });
            } else {
                // User not fond in database
                request.yar.flash('error', 'Old password is incorrect');
                return reply.redirect('/me/settings/account');
            }
        });
    }
};
