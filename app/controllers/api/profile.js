'use strict';

var Joi = require('joi');


exports.postEditProfile = {
    description: 'Post Edit profile settings',
    validate: {
        payload: {
            firstname: Joi.string().min(2).max(20).required(),
            lastname: Joi.string().min(2).max(20).required(),
            gender: Joi.string().max(100).required(),
            dob: Joi.string().max(100).allow(''),
            mobile: Joi.string().max(100).allow(''),
            email: Joi.string().max(100).allow(''),
            sas: Joi.string().allow(''),
            sas_years: Joi.string().max(100).allow(''),
            ias: Joi.string().allow(''),
            ias_years: Joi.string().max(100).allow(''),
            title: Joi.string().max(100).allow(''),
            region_type: Joi.string().max(100).allow(''),
            region_name: Joi.string().max(100).allow(''),
            work_email: Joi.string().max(100).allow(''),
            work_years: Joi.string().max(100).allow(''),
            time_on_nrega: Joi.string().max(100).allow('')
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
        var User = request.server.plugins.sequelize.db.users;
        User.findOne({
            where: {
                id: id
            }
        }).then(function(user) {
            if (user) { // if the record exists in the db
                user.update(request.payload).then(function() {
                    request.auth.session.clear();
                    request.auth.session.set(user);
                    return reply(user);

                });

            } else {
                return reply(Boom.badImplementation('An internal server error occurred'));
            }
        });
    }
};
