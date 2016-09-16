'use strict';

exports.register = function(plugin, options, next) {

    const Controllers = {
        contact: require('../controllers/contact/contact')
    };

    plugin.route([

        //  Muster cards
        {
            method: 'GET',
            path: '/contact',
            config: Controllers.contact.getData
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'contact_routes',
    version: require('../../package.json').version
};
