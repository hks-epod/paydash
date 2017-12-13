'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Queries = require('../../helpers/queries');

exports.addTicket = {
    description: 'Add new support ticket',
    validate: {
        payload: {
            subject: Joi.string()
                .max(500)
                .allow(''),
            email: Joi.string().max(100),
            description: Joi.string()
                .max(5000)
                .allow('')
        },
        failAction: function(request, reply, source, error) {
            // Boom bad request
            return reply(Boom.badRequest(error));
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
            email: request.auth.credentials.email,
            description: request.payload.description
        };

        if (ticket.email==='' || ticket.email===null || ticket.email===undefined) { 
            ticket.email = ('user'+request.auth.credentials.id+'@noemail.com');
        }

        var freshDesk = request.server.plugins.freshdesk;

        freshDesk.newTicket(ticket, function() {
            return reply({
                statusCode: 200,
                message: 'Successfully created ticket.'
            });
        });
    }
};

exports.askHelp = {
    description: 'Contact number for ask help call',
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

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var queryString = Queries.contact();
        sequelize
            .query(queryString, {
                type: sequelize.QueryTypes.SELECT
            })
            .then(function(rows) {
                var data = {
                    contact_no: rows[0].phone
                };

                reply(data);
            });
    }
};
