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
            // User monitoring data
            {
                method: 'GET',
                path: '/monitor/user/data',
                config: Controllers.monitor.user.getData
            },
            // Server monitoring
            {
                method: 'GET',
                path: '/monitor/server',
                config: Controllers.monitor.server.showPage
            },
            // Server monitoring
            {
                method: 'GET',
                path: '/monitor/server/data',
                config: Controllers.monitor.server.getData
            },
            // Analysis monitoring
            {
                method: 'GET',
                path: '/monitor/analysis',
                config: Controllers.monitor.analysis.showPage
            },
            // Analysis monitoring data api
            {
                method: 'GET',
                path: '/monitor/analysis/data',
                config: Controllers.monitor.analysis.getData
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
