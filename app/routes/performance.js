'use strict';

exports.register = function(plugin, options, next) {

    const Controllers = {
        performance: {
            overview: require('../controllers/performance/overview'),
            discrete: require('../controllers/performance/discrete'),
            panchayat: require('../controllers/performance/panchayat')
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
        }, {
            method: 'GET',
            path: '/performance/panchayat/data',
            config: Controllers.performance.panchayat.getData
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'performance_routes',
    version: require('../../package.json').version
};
