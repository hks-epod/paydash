'use strict';

exports.register = function(plugin, options, next) {
    const Controllers = {
        delayed_musters: require('../controllers/delayed_musters/delayed_musters')
    };

    plugin.route([
        {
            method: 'GET',
            path: '/delayed_musters',
            config: Controllers.delayed_musters.show
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'delayed_musters_routes',
    version: require('../../package.json').version
};