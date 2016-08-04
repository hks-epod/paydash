'use strict';

exports.register = function(plugin, options, next) {

    const Controllers = {
        overview: require('../controllers/overview/overview')
    };

    plugin.route([

        // Performance 
        {
            method: 'GET',
            path: '/overview',
            config: Controllers.overview.showPage
        }, {
            method: 'GET',
            path: '/overview/data',
            config: Controllers.overview.getData
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'overview_routes',
    version: require('../../package.json').version
};
