'use strict';

const Queries = require('../../helpers/queries');
const Translate = require('../../templates/helpers/t');

exports.showStep = {
    auth: {
        scope: ['block', 'editor']
    },
    handler: function(request, reply) {
        return reply.view('editor/step');
    }
};
