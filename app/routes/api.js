'use strict';

exports.register = function(plugin, options, next) {
    // Load plugin dependencies
    plugin.dependency(['auth'], function(plugin, next) {

        var Controllers = {
            api: {
                login: require('../controllers/api/login'),
                // logout: require('../controllers/api/logout')
            }
        };

        plugin.route([
            // All the routes all prefixed with /api check manifest
            // Login api
            {
                method: 'POST',
                path: '/api/login',
                config: Controllers.api.login.postForm
            }
        ]);

        next();
    });

    next();
};

exports.register.attributes = {
    name: 'api_routes',
    version: require('../../package.json').version
};
