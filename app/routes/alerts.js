'use strict';

exports.register = function(plugin, options, next) {

    plugin.dependency('auth', function(plugin, next) {

        var Controllers = {
            alerts: {
                notifications: require('../controllers/alerts/notifications')
                // feedbacks: require('../controllers/alerts/feedbacks')
            }
        };

        plugin.route([

            // Show Notifications
            {
                method: 'GET',
                path: '/notifications',
                config: Controllers.alerts.notifications.showNotifications
            }
        ]);

        next();
    });

    next();
};

exports.register.attributes = {
    name: 'alert_routes',
    version: require('../../package.json').version
};
