'use strict';

const Joi = require('joi');
const Request = require('request');

// Declare internals
var internals = {};

internals.schema = Joi.object({
    key: Joi.string()
});

exports.register = function(server, options, next) {
    Joi.assert(options, internals.schema);

    server.expose('newTicket', function(ticket, cb) {
        Request.post(
            {
                url: 'https://hksepod.freshdesk.com/api/v2/tickets',
                headers: {
                    Authorization: 'Basic ' + options.key,
                    'Content-Type': 'application/json'
                },
                json: true,
                body: {
                    subject: ticket.subject,
                    description: ticket.description,
                    email: ticket.email,
                    status: 2,
                    priority: 1
                }
            },
            function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    cb(null);
                } else {
                    cb(error);
                }
            }
        );
    });

    return next();
};

exports.register.attributes = {
    name: 'freshdesk'
};
