'use strict';

const Joi = require('joi');
const Boom = require('boom');

exports.addTicket = {
    description: 'Add new support ticket',
    validate: {
        payload: {
            subject: Joi.string().max(500).allow(''),
            email: Joi.string().max(100),
            description: Joi.string().max(5000).allow('')
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
        'hapi-auth-cookie': {
            redirectTo: false
        }
    },
    handler: function(request, reply) {
        var ticket = {
            subject: request.payload.subject,
            email: request.payload.email,
            description: request.payload.description
        };

        var freshDesk = request.server.plugins.freshdesk;

        freshDesk.newTicket(ticket, function() {
            return reply({
                statusCode: 200,
                message: 'Successfully created ticket.'
            });
        });
    }
};
