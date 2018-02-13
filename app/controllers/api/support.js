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

        // We want to modify the email address but we need to do a bunch of stuff to maintain backward compatibility
        // Prior to version 2.3 of the app, FreshDesk support was not implemented.
        // In these versions, contact support involved showing the user our email address (epodindianrega@gmail.com)
        // For the in-app (logged in) support feature with FreshDesk integration, the email for the FreshDesk ticket is still being pulled from the old contact email (epodindianrega@gmail.com)
        // However, for FreshDesk tickets this email address should be modified in most cases to be the email of the user.

        // Case 1: In-app (logged in) FreshDesk ticket creation
        // Change email address from epodindianrega@gmail.com to the user's email address
        // First choice is their user-entered email address.
        // Second choice is their Google account email address.
        // Third choice is epodindianrega@gmail.com. In this case the subject line will still contain their identifying information. But the email address is how FreshDesk categorizes our "contacts" so it is preferable to use the user's email address if it is available.

        var userEmail; 
        if ((request.payload.email==='epodindianrega@gmail.com') && (request.auth.isAuthenticated)) { // this is how we know it's an in-app (logged in) request
            // We want to use the user-entered email field on their account. 
            // If that's not filled we want to use their Google Account. 
            // If that's empty we set the email as epodindianrega@gmail.com. This is the "master" PayDash account on FreshDesk. Email address is a required field for opening FreshDesk tickets. 
            if ((request.auth.credentials.email==='' || request.auth.credentials.email===null) && (request.auth.credentials.google_account!==null)) { 
                userEmail = request.auth.credentials.google_account;
            } else if (request.auth.credentials.email!==null) {
                userEmail = request.auth.credentials.email;
            } else {
                userEmail = 'epodindianrega@gmail.com';
            }
        }
        // Case 2: Login help (by definition not logged in) FreshDesk ticket creation
        // Email address will be blank and needs to be replaced with epodindianrega@gmail.com

        // Case 3: Employee data help () FreshDesk ticket creation
        // Email address will be blank and needs to be replaced with epodindianrega@gmail.com

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
                email: '',
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
                email: '',
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
