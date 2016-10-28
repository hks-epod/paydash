'use strict';

exports.show = {
    auth: {
      scope : ['block', 'editor']
    },
    handler: function(request, reply) {
        reply.view('editor/info');
        
    }
};
