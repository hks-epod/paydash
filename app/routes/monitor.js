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
            // User monitororing data
            {
                method: 'GET',
                path: '/monitor/user/data',
                config: Controllers.monitor.user.getData
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
    name: 'monitor_routes',
    version: require('../../package.json').version
};
