'use strict';

exports.register = function(plugin, options, next) {

    const Controllers = {
        core: {
            pages: require('../controllers/core/pages'),
            fallback: require('../controllers/core/fallback'),
            static: require('../controllers/core/static')
        }
    };

    plugin.route([

        // Home Page
        {
            method: 'GET',
            path: '/',
            config: Controllers.core.pages.home
        },
        // Assets & static Routes
        {
            method: 'GET',
            path: '/css/{path*}',
            config: {
                auth: false
            },
            handler: Controllers.core.static.css
        }, {
            method: 'GET',
            path: '/images/{path*}',
            config: {
                auth: false
            },
            handler: Controllers.core.static.img
        }, {
            method: 'GET',
            path: '/js/{path*}',
            config: {
                auth: false
            },
            handler: Controllers.core.static.js
        }, {
            method: 'GET',
            path: '/fonts/{path*}',
            config: {
                auth: false
            },
            handler: Controllers.core.static.fonts
        }, {
            method: 'GET',
            path: '/favicon.ico',
            config: {
                auth: false
            },
            handler: Controllers.core.static.favicon
        }, {
            method: 'GET',
            path: '/heartbeat',
            config: Controllers.core.static.heartbeat
        },
        // Fallback route
        {
            method: '*',
            path: '/{p*}',
            config: Controllers.core.fallback.notfound
        }

    ]);

    next();
};

exports.register.attributes = {
    name: 'index_routes',
    version: require('../../package.json').version
};
