'use strict';

var mongoose = require('mongoose');
var Joi = require('joi');
var User = mongoose.model('User');

exports.showNotificationForm = {
    description: 'Show notifications settings',
    handler: function(request, reply) {

        reply.view('users/settings-notifications');
    }
};
