'use strict';

const Queries = require('../../helpers/queries');
const D3 = require('d3');
const Utils = require('../../helpers/utils');
const Joi = require('joi');
const Translate = require('../../templates/helpers/t');
const Handlebars = require('handlebars');

exports.show = {
    auth: {
        scope: ['block', 'editor', 'district']
    },
    handler: function(request, reply) {
        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var userId = request.auth.credentials.id;
        var role = request.auth.credentials.role;
        var queryString = Queries.contact(userId,role);

        sequelize
            .query(queryString, {
                type: sequelize.QueryTypes.SELECT
            })
            .then(function(rows) {
                var contactResponse = rows[0];
                var data = {
                    phone: contactResponse[0].phone
                };
                var template = Handlebars.compile(
                    Translate('/web/contact/call', request.auth.credentials, null)
                );
                var result = template(data);
                reply.view('contact/contact', { info: result });
            });
    }
};

exports.sendMessage = {
    auth: {
        scope: ['block', 'editor', 'district']
    },
    validate: {
        payload: {
            message: Joi.string().max(5000)
        },
        failAction: function(request, reply, source, error) {
            // Boom bad request
            request.yar.flash('error', 'Bad request');
            return reply.redirect('/me/settings/profile');
        }
    },
    handler: function(request, reply) {
        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var userId = request.auth.credentials.id;
        var name = request.auth.credentials.firstname + ' ' + request.auth.credentials.lastname;
        var email = request.auth.credentials.email === null ? 'user'+userId+'@noemail.com' : request.auth.credentials.email;
        var role = request.auth.credentials.role;
        var userMobile = request.auth.credentials.mobile;

        var queryString = Queries.contact(userId,role);

        sequelize
            .query(queryString, {
                type: sequelize.QueryTypes.SELECT
            })
            .then(function(rows) {

                var contactResponse = D3.values(rows[0]);
                var regionsResponse = D3.values(rows[1]);

                var subject = Utils.buildSubject(name, regionsResponse, userId, userMobile);

                var ticket = {
                    subject: subject,
                    email: email,
                    description: request.payload.message
                };

                var freshDesk = request.server.plugins.freshdesk;
                freshDesk.newTicket(ticket, function(err) {
                    if (err) {
                        request.yar.flash('error', 'Something went wrong. Please try again.');
                    } else {
                        request.yar.flash('success', 'Your message has been sent.');
                    }
                    return reply.redirect('/contact');
                });
            });
    }
};
