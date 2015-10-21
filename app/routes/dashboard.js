'use strict';

exports.register = function(plugin, options, next) {

    plugin.dependency('auth', function(plugin, next) {

        var Controllers = {
            dashboard: {
                block: require('../controllers/dashboard/performance-block'),
                panchayat: require('../controllers/dashboard/performance-panchayat')
            }
        };

        plugin.route([

            // Block Dashoard
            {
                method: 'GET',
                path: '/dashboard/block',
                config: Controllers.dashboard.block
            },
            // Panchayat Dashboard
            {
                method: 'GET',
                path: '/dashboard/panchayat',
                config: Controllers.dashboard.panchayat
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
