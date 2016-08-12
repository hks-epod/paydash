'use strict';

var Joi = require('joi');
var Boom = require('boom');


exports.postEditProfile = {
    description: 'Post Edit profile settings',
    validate: {
        payload: {
            firstname: Joi.string().min(2).max(20).required(),
            lastname: Joi.string().min(2).max(20).required(),
            middlename: Joi.string().min(2).max(20).required(),
            dob: Joi.string().max(100).allow(''),
            mobile: Joi.string().max(100).allow(''),
            email: Joi.string().max(100).allow(''),
            title: Joi.string().max(100).allow(''),
            work_email: Joi.string().max(100).allow(''),
            lang: Joi.string().min(1).max(10),
            designation: Joi.string().max(100).allow(''),
            phone_alternate: Joi.string().max(100).allow('')
        },
        failAction: function(request, reply, source, error) {
            // Boom bad request
            return reply.reply(Boom.badRequest(error));
        }
    },
    handler: function(request, reply) {

        var id = request.auth.credentials.id.toString();
        request.payload.updated_at = Date.now();
        var User = request.server.plugins.sequelize.db.users;
        User.findOne({
            where: {
                id: id
            }
        }).then(function(user) {
            if (user) { // if the record exists in the db
                user.update(request.payload).then(function() {
                    request.cookieAuth.clear();
                    request.cookieAuth.set(user);
                    return reply(user);
                });

            } else {
                return reply(Boom.badImplementation('An internal server error occurred'));
            }
        });
    }
};
