'use strict';

exports.register = function(plugin, options, next) {
    const Controllers = {
        contact: require('../controllers/contact/contact')
    };

    plugin.route([
        {
            method: 'GET',
            path: '/contact',
            config: Controllers.contact.show
        },
        {
            method: 'POST',
            path: '/contact',
            config: Controllers.contact.sendMessage
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'contact_routes',
    version: require('../../package.json').version
};
