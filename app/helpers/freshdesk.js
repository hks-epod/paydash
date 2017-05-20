'use strict';

const Request = require('request');

exports.newTicket = function(ticket, cb) {
    Request.post(
        {
            url: 'https://hksepod.freshdesk.com/api/v2/tickets',
            form: {
                subject: ticket.subject,
                description: ticket.description,
                email: ticket.email,
                status: '2',
                priority: '1'
            }
        },
        function(err, httpResponse, body) {
            cb();
        }
    );
};
