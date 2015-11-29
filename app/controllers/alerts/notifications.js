'use strict';

var Joi = require('joi');

exports.showNotifications = {
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
                UserId: '1',
                viewed: 1
            }
        }).then(function(read) {
            ctx.notifications.read = read;

            notifications.findAll({
                where: {
                    UserId: '1',
                    viewed: 0
                }
            }).then(function(unread) {
                ctx.notifications.unread = unread;
                //  Mark notifications read
                notifications.update({
                    viewed: 1
                }, {
                    where: {
                        UserId: '1',
                        viewed: 0
                    }
                });
                reply.view('alerts/notifications', ctx);
            });
        });

    }
};
