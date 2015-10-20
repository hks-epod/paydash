'use strict';
var Hoek = require('hoek');

exports.register = function(plugin, options, next) {

    plugin.ext('onPreResponse', function(request, reply) {

        if (request.session.flash && request.response.variety === 'view') {
            var flash = request.session.flash();
            request.session.set('_flash', {});

            request.response.source.context = Hoek.applyToDefaults({
                flash: flash
            }, request.response.source.context);
        }

        return reply.continue();
    });

    next();
};

exports.register.attributes = {
    name: 'flash'
};
