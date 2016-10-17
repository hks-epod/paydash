'use strict';

const Translate = require('../../templates/helpers/t');

exports.show = {
    auth: {
      scope : 'block'
    },
    handler: function(request, reply) {

        var info = Translate('/web/editor/info', request.auth.credentials, null);
        reply.view('editor/info', {info: info});
        
    }
};
