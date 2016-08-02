'use strict';

exports.register = function(plugin, options, next) {

    var Controllers = {
        musters: {
            cards: require('../controllers/musters/cards')
        }
    };

    plugin.route([

        //  Muster cards
        {
            method: 'GET',
            path: '/musters/cards',
            config: Controllers.musters.cards.showPage
        },

        // Muster cards data
        {
            method: 'GET',
            path: '/musters/cards/data',
            config: Controllers.musters.cards.getData
        },
    ]);

    next();
};

exports.register.attributes = {
    name: 'musters_routes',
    version: require('../../package.json').version
};
