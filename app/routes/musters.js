'use strict';

exports.register = function(plugin, options, next) {

    plugin.dependency('auth', function(plugin, next) {

        var Controllers = {
            musters: {
                current: require('../controllers/musters/current-musters'),
                delayed: require('../controllers/musters/delayed-musters')
            }
        };

        plugin.route([

            // Block Dashoard
            {
                method: 'GET',
                path: '/musters/current',
                config: Controllers.musters.current.showPage
            },
            // Block Dashoard
            {
                method: 'GET',
                path: '/musters/current/data',
                config: Controllers.musters.current.getData
            },
            // Panchayat Dashboard
            {
                method: 'GET',
                path: '/musters/delayed',
                config: Controllers.musters.delayed.showPage
            },
            // Block Dashoard
            {
                method: 'GET',
                path: '/musters/delayed/data',
                config: Controllers.musters.delayed.getData
            },
        ]);

        next();
    });

    next();
};

exports.register.attributes = {
    name: 'musters_routes',
    version: require('../../package.json').version
};
