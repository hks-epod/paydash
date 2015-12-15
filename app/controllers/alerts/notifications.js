'use strict';

var Joi = require('joi');

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
                user_id: '1',
                viewed: 0
            }
        }).then(function(unread) {
            ctx.notifications = unread;
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
            notifications: {
                read: null,
                unread: null
            }
        };

        notifications.findAll({
            where: {
                user_id: '1',
                viewed: 1
            }
        }).then(function(read) {
            ctx.notifications = read;
            reply.view('alerts/notifications-read', ctx);
        });

    }
};
