'use strict';

var Translate = require('../templates/helpers/t');


exports.message = function(n, request) {
    var msg = '';

    if (n.dataValues.notification_type === 1) {
        var region_name = n.dataValues.region_name;
        var total_transactions = n.dataValues.total_transactions;
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var batch_date = n.dataValues.batch_date.getDate() + ' ' + monthNames[n.dataValues.batch_date.getMonth()] + ' ' + n.dataValues.batch_date.getFullYear();
        var notification_sub_text = Translate('/notifications/message/1/block', request.auth.credentials);

        if (request.auth.credentials.lang === 'en_US') {
            msg = region_name + notification_sub_text[0] + total_transactions + notification_sub_text[1] + batch_date + notification_sub_text[2];
        } else if (request.auth.credentials.lang === 'hi') {
            msg = region_name + notification_sub_text[0] + batch_date + notification_sub_text[1] + total_transactions + notification_sub_text[2];
        }

    }

    if (n.dataValues.notification_type === 2) {
        var days_to_payment = n.dataValues.days_to_payment;
        var notification_sub_text = Translate('/notifications/message/2/main', request.auth.credentials);
        var comparison_array = Translate('/notifications/message/2/comparison', request.auth.credentials);

        if (days_to_payment > 15) {
            var comparison_text = comparison_array[0];
        } else if (days_to_payment === 15) {
            var comparison_text = comparison_array[1];
        } else if (days_to_payment < 15) {
            var comparison_text = comparison_array[2];
        }

        msg = notification_sub_text[0] + days_to_payment + notification_sub_text[1] + comparison_text + notification_sub_text[2];

    }

    return msg;
}
