'use strict';

exports.register = function(plugin, options, next) {
    const Controllers = {
        musters: require('../controllers/musters/musters')
    };

    plugin.route([
        //  Muster cards
        {
            method: 'GET',
            path: '/musters',
            config: Controllers.musters.showPage
        },

        // Muster cards data
        {
            method: 'GET',
            path: '/musters/data',
            config: Controllers.musters.getData
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'musters_routes',
    version: require('../../package.json').version
};
