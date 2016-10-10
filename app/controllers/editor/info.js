'use strict';

const Translate = require('../../templates/helpers/t');

exports.getData = {
    handler: function(request, reply) {

        var info = Translate('/web/editor/info', request.auth.credentials, null);
        reply.view('editor/info', {info: info});
        
    }
};
