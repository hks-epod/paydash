'use strict';

var Joi = require('joi');
var _ = require('lodash');

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
            ctx.notifications = _.groupBy(read, function(n) {
                return n.batch_id;
            });
        
            reply.view('alerts/notifications-read', ctx);
        });

    }
};
