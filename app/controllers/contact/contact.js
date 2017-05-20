'use strict';

const Queries = require('../../helpers/queries');
const D3 = require('d3');
const Utils = require('../../helpers/utils');
const Joi = require('joi');
const Translate = require('../../templates/helpers/t');
const Handlebars = require('handlebars');
const FreshDesk = require('../../helpers/freshdesk');

exports.show = {
    auth: {
        scope: ['block', 'editor', 'district']
    },
    handler: function(request, reply) {
        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var userId = request.auth.credentials.id;
        var queryString = Queries.contact(userId);

        sequelize
            .query(queryString, {
                type: sequelize.QueryTypes.SELECT
            })
            .then(function(rows) {
                var contactResponse = rows;
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
        var queryString = Queries.contact(userId);

        sequelize
            .query(queryString, {
                type: sequelize.QueryTypes.SELECT
            })
            .then(function(rows) {
                var contactResponse = rows;

                var subject = Utils.buildSubject(contactResponse[0].subject, userId);

                var ticket = {
                    subject: subject,
                    email: 'epodindianrega@gmail.com',
                    description: request.payload.message
                };

                FreshDesk.newTicket(ticket, function() {});

                request.yar.flash('success', 'Your message has been sent.');
                return reply.redirect('/contact');
            });
    }
};
