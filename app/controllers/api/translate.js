'use strict';

var queries = require('../../helpers/queries');
var utils = require('../../helpers/utils');
var Translate = require('../../templates/helpers/t');


exports.getData = {
    plugins: {
        'crumb': {
            skip: true
        }
    },
    handler: function(request, reply) {

        var res = {
            en_US: Translate('/app', { lang: 'en_US' }),
            hi: Translate('/app', { lang: 'hi' })
        }

        reply(res);

    }
};
