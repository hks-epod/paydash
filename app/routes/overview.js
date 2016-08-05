'use strict';

exports.register = function(plugin, options, next) {

    const Controllers = {
        overview: require('../controllers/overview/overview')
    };

    plugin.route([

        // Overview 
        {
            method: 'GET',
            path: '/overview',
            config: Controllers.overview.showPage
        },

        // Overview data
        {
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
