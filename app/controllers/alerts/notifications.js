'use strict';

var Joi = require('joi');

exports.showNotifications = {
    description: 'Show notifications',
    handler: function(request, reply) {



        var ctx = {
        };
        reply.view('alerts/notifications', ctx);

    }
};
