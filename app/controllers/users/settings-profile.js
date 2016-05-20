'use strict';

var Joi = require('joi');

exports.showEditProfile = {
    description: 'Show Edit profile settings',
    handler: function(request, reply) {
        var ctx = {
            user: request.auth.credentials
        };
        reply.view('users/settings-profile', ctx);

    }
};

exports.postEditProfile = {
    description: 'Post Edit profile settings',
    validate: {
        payload: {
            mobile: Joi.string().max(100).allow(''),
            email: Joi.string().max(100).allow(''),
            work_email: Joi.string().max(100).allow('')
        },
        failAction: function(request, reply, source, error) {
            // Boom bad request
            console.log(error);
            request.session.flash('error', 'Bad request');
            return reply.redirect('/me/settings/profile');
        }
    },
    handler: function(request, reply) {

        var id = request.auth.credentials.id.toString();
        request.payload.updated = Date.now();
        var User = request.server.plugins.sequelize.db.User;
        User.findOne({
            where: {
                id: id
            }
        }).then(function(user) {
            if (user) { // if the record exists in the db
                user.update(request.payload).then(function() {
                    request.auth.session.clear();
                    request.auth.session.set(user);
                    request.session.flash('success', 'Profile successfully saved');
                    return reply.redirect('/me/settings/profile');

                });

            } else {
                request.session.flash('error', 'An internal server error occurred');
                return reply.redirect('/me/settings/profile');
            }
        });
    }
};
