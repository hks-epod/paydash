'use strict';

exports.register = function(plugin, options, next) {

    plugin.dependency('auth', function(plugin, next) {

        var Controllers = {
            performance: {
                overview: require('../controllers/performance/overview'),
                discrete: require('../controllers/performance/discrete')
            }
        };

        plugin.route([

            // Overview Performance 
            {
                method: 'GET',
                path: '/performance/overview',
                config: Controllers.performance.overview.showPage
            }, {
                method: 'GET',
                path: '/performance/overview/data',
                config: Controllers.performance.overview.getData
            },
            // Discrete Performance  
            {
                method: 'GET',
                path: '/performance/discrete',
                config: Controllers.performance.discrete.showPage
            }, {
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
