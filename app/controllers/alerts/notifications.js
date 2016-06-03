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

            unread.forEach(function(n) {
                n.dataValues.msg = generateMessage(n,request);
            });

            // Group notifications by batch ID, 
            ctx.notifications =_.groupBy(unread, function(n) {
                return n.batch_id;
            });

            console.log(ctx.notifications)
            //  Mark notifications read
            notifications.update({
                viewed: 1
            }, {
                where: {
                    user_id: request.auth.credentials.id,
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
            read.forEach(function(n) {
                n.dataValues.msg = generateMessage(n,request);
            });

            // Group notifications by batch ID
            ctx.notifications = _.groupBy(read, function(n) {
                return n.batch_id;
            });

            console.log(ctx.notifications)

            reply.view('alerts/notifications-read', ctx);
        });

    }
};

function generateMessage(n, request) {
    var msg = '';

    // console.log(n)
    if (n.dataValues.notification_type===1) {
        var region_name = n.dataValues.region_name;
        var total_transactions = n.dataValues.total_transactions;
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var batch_date = n.dataValues.batch_date.getDate() + ' ' + monthNames[n.dataValues.batch_date.getMonth()] + ' ' + n.dataValues.batch_date.getFullYear();

        if (request.auth.credentials.role==='block') {
            var notification_sub_text = Translate('/notifications/message/1/block', request.auth.credentials);
        }
        else if (request.auth.credentials.role==='district') {
            var notification_sub_text = Translate('/notifications/message/1/district', request.auth.credentials);
        }

        if (request.auth.credentials.lang==='en_US') {

            msg = region_name + notification_sub_text[0] + total_transactions + notification_sub_text[1] + batch_date + notification_sub_text[2];
        }
        else if (request.auth.credentials.lang==='hi') {
            msg = region_name + notification_sub_text[0] + batch_date + notification_sub_text[1] + total_transactions + notification_sub_text[2];
        }
    }

    if (n.dataValues.notification_type===2) {
        var days_to_payment = n.dataValues.days_to_payment;
        var notification_sub_text = Translate('/notifications/message/2/main', request.auth.credentials);
        var comparison_array = Translate('/notifications/message/2/comparison', request.auth.credentials);

        if (days_to_payment>15) {
            var comparison_text = comparison_array[0];
        }
        else if (days_to_payment===15) {
            var comparison_text = comparison_array[1];
        }
        else if (days_to_payment<15) {
            var comparison_text = comparison_array[2];
        }
        
        msg = notification_sub_text[0] + days_to_payment + notification_sub_text[1] + comparison_text + notification_sub_text[2];

    }

    return msg;
}
