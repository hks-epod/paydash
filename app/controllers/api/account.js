'use strict';

var Joi = require('joi');
var Boom = require('boom');

exports.postChangePassword = {
    description: 'Password change api',
    validate: {
        payload: {
            oldPassword: Joi.string().min(6).max(20).required(),
            newPassword: Joi.string().min(6).max(20).required(),
            verify: Joi.string().required(),
        },
        failAction: function(request, reply, source, error) {
            // Boom bad request
            return reply.reply(Boom.badRequest(error));
        }
    },
    handler: function(request, reply) {

        if (request.payload.newPassword !== request.payload.verify) {
            return reply.reply(Boom.badRequest('New password does not match'));
        }
        var User = request.server.plugins.sequelize.db.User;

        User.findOne({
            where: {
                username: request.auth.credentials.username,
                password: Crypto.createHash('md5').update(request.payload.oldPassword).digest('hex')
            }
        }).then(function(user) {
            if (user) {
                user.update({
                    password: Crypto.createHash('md5').update(request.payload.newPassword).digest('hex')
                }).then(function() {
                    request.auth.session.clear();
                    return reply('Password changed successfully. Please login with new password');
                });
            } else {
                // User not fond in database
                return reply.reply(Boom.badRequest('Old password is incorrect'));
            }
        });
    }
};
