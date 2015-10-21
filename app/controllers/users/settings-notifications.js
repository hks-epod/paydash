'use strict';

var Joi = require('joi');

exports.showNotificationForm = {
    description: 'Show notifications settings',
    handler: function(request, reply) {

        reply.view('users/settings-notifications');
    }
};
