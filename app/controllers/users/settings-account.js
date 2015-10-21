'use strict';

var Joi = require('joi');

exports.showEditAccount = {
    description: 'Show Edit account settings',
    handler: function(request, reply) {
        reply.view('users/settings-account');
    }
};


exports.postChangePassword = {
    description: 'Password change',
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
            verify: Joi.string().required(),
        },
        failAction: function(request, reply, source, error) {
            // Boom bad request
            request.session.flash('error', 'Bad request');
            return reply.redirect('/signup');
        }
    },
    handler: function(request, reply) {

        if (request.payload.newPassword !== request.payload.verify) {
            request.session.flash('error', ' New Password does not match');
            return reply.redirect('/me/settings/account');
        }
        var User = request.server.plugins.sequelize.db.User;
        // User.findByCredentials(request.auth.credentials.username, request.payload.oldPassword, function(err, user, msg) {
        //     if (err) {
        //         request.session.flash('error', 'An internal server error occurred');
        //         return reply.redirect('/me/settings/account');
        //     }
        //     if (user) {
        //         user.password = request.payload.newPassword;
        //         user.save(function(err) {
        //             if (err) {
        //                 request.session.flash('error', 'An internal server error occurred');
        //                 return reply.redirect('/me/settings/account');
        //             }
        //             request.session.flash('success', 'Password changed successfully. Please login with new password');
        //             request.auth.session.clear();
        //             return reply.redirect('/login');
        //         });
        //     } else {
        //         // User not fond in database
        //         request.session.flash('error', 'Old password is incorrect');
        //         return reply.redirect('/me/settings/account');
        //     }
        // });



    }
};
