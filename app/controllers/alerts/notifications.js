'use strict';

var Joi = require('joi');
var _ = require('lodash');
var Translate = require('../../templates/helpers/t');

exports.showUnreadNotifications = {
    description: 'Show unread notifications',
    handler: function(request, reply) {

        var db = request.server.plugins.sequelize.db;
        var notifications = request.server.plugins.sequelize.db.notifications;
        var ctx = {
            notifications: null
        };
        notifications.findAll({
            where: {
                user_id: request.auth.credentials.id,
                viewed: 0
            }
        }).then(function(unread) {
            
            // Build notification message here, if face problems here you can build them after grouping as well. 
            // This gives chunk of text from loclaes file depending up which language is the selected by user. 
            // you can define as many chunks in locales file nested at notifications.message
            var notification_sub_text = Translate('/notifications/message/1', request.auth.credentials);


            // Group notifications by batch ID, 
            ctx.notifications =_.groupBy(unread, function(n) {
                return n.batch_id;
            });
            //  Mark notifications read
            notifications.update({
                viewed: 1
            }, {
                where: {
                    user_id: '1',
                    viewed: 0
                }
            });
            reply.view('alerts/notifications-unread', ctx);
        });

    }
};

exports.showReadNotifications = {
    description: 'Show notifications',
    handler: function(request, reply) {

        var db = request.server.plugins.sequelize.db;
        var notifications = request.server.plugins.sequelize.db.notifications;
        var ctx = {
            notifications: null
        };

        notifications.findAll({
            where: {
                user_id: request.auth.credentials.id,
                viewed: 1
            }
        }).then(function(read) {

            // Build notification message here, if face problems here you can build them after grouping as well. 
            // This gives chunk of text from loclaes file depending up which language is the selected by user. 
            // you can define as many chunks in locales file nested at notifications.message
            var notification_sub_text = Translate('/notifications/message/1', request.auth.credentials);


            // Group notifications by batch ID
            ctx.notifications = _.groupBy(read, function(n) {
                return n.batch_id;
            });

            reply.view('alerts/notifications-read', ctx);
        });

    }
};
