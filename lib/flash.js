'use strict';
var Hoek = require('hoek');

exports.register = function(plugin, options, next) {

    plugin.ext('onPreResponse', function(request, reply) {

        if (request.yar && request.yar.flash && request.response.variety === 'view') {
            var flash = request.yar.flash();
            request.yar.set('_flash', {});
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
