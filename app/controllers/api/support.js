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

exports.submitHelp = {
    description: 'Add new support ticket',
    validate: {
        payload: {
            type: Joi.string()
                .max(500)
                .allow(''),
            data: {
                contact_no: Joi.string()
                    .max(20)
                    .allow(''),
                description: Joi.string()
                    .max(5000)
                    .allow('')
            }
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
        var freshDesk = request.server.plugins.freshdesk;
        
        if (request.payload.type==='help-employee-info') {
            var ticket = {
                subject: 'Employee data help request [phone: ' + (request.payload.data.contact_no) + ']',
                email: 'epodindianrega@gmail.com',
                description: 'A user has requested assistance updating their employee information. Please contact them at the number provided in the subject line.'
            };

            freshDesk.newTicket(ticket, function() {
                return reply({
                    statusCode: 200,
                    message: 'Successfully created ticket.'
                });
            });
        } else if (request.payload.type==='help-login') {
            var ticket = {
                subject: 'Login screen help request [phone: ' + (request.payload.data.contact_no) + ']',
                email: 'epodindianrega@gmail.com',
                description: request.payload.data.description
            };

            freshDesk.newTicket(ticket, function() {
                return reply({
                    statusCode: 200,
                    message: 'Successfully created ticket.'
                });
            });
        } else {
            return reply(Boom.badRequest('Bad request'));
        }


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
