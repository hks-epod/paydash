'use strict';

exports.register = function(plugin, options, next) {
    const Controllers = {
        performance: require('../controllers/performance/performance')
    };

    plugin.route([
        // Performance
        {
            method: 'GET',
            path: '/performance',
            config: Controllers.performance.showPage
        },

        // Performance data
        {
            method: 'GET',
            path: '/performance/data',
            config: Controllers.performance.getData
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'performance_routes',
    version: require('../../package.json').version
};
