'use strict';

var Joi = require('joi');
var Boom = require('boom');


exports.postEditProfile = {
    description: 'Post Edit profile settings',
    validate: {
        payload: {
            mobile: Joi.string().max(100).allow(''),
            email: Joi.string().max(100).allow(''),
            work_email: Joi.string().max(100).allow(''),
            lang: Joi.string().min(1).max(10)
        },
        failAction: function(request, reply, source, error) {
            // Boom bad request
            return reply.reply(Boom.badRequest(error));
        }
    },
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        'crumb': {
            skip: true
        },
        'hapi-auth-cookie': {
            redirectTo: false
        }
    },
    handler: function(request, reply) {

        if (!request.auth.isAuthenticated) {
            return Boom.forbidden('You are not logged in');
        }

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
