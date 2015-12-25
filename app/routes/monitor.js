'use strict';

exports.register = function(plugin, options, next) {

    plugin.dependency('auth', function(plugin, next) {

        var Controllers = {
            monitor: {
                user: require('../controllers/monitor/user'),
                server: require('../controllers/monitor/server'),
                analysis: require('../controllers/monitor/analysis')
            }
        };

        plugin.route([

            // User monitororing dashbaord
            {
                method: 'GET',
                path: '/monitor/user',
                config: Controllers.monitor.user.showPage
            },
            // Panchayat Dashboard
            {
                method: 'GET',
                path: '/monitor/server',
                config: Controllers.monitor.server.showPage
            }
        ]);

        next();
    });

    next();
};

exports.register.attributes = {
    name: 'dashboard_routes',
    version: require('../../package.json').version
};
