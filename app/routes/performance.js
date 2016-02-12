'use strict';

exports.register = function(plugin, options, next) {

    plugin.dependency('auth', function(plugin, next) {

        var Controllers = {
            performance: {
                overview: require('../controllers/performance/overview'),
                discrete: require('../controllers/performance/overview')
            }
        };

        plugin.route([

            // Block Dashoard
            {
                method: 'GET',
                path: '/performance/overview',
                config: Controllers.performance.overview.showPage
            },
            // Block Dashoard
            {
                method: 'GET',
                path: '/performance/overview/data',
                config: Controllers.performance.overview.getData
            },
            // Panchayat Dashboard
            {
                method: 'GET',
                path: '/performance/discrete',
                config: Controllers.performance.discrete.showPage
            },
            // Block Dashoard
            {
                method: 'GET',
                path: '/performance/discrete/data',
                config: Controllers.performance.discrete.getData
            },
        ]);

        next();
    });

    next();
};

exports.register.attributes = {
    name: 'performance_routes',
    version: require('../../package.json').version
};
