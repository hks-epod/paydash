'use strict';

exports.policy = {
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false
        }
    },
    handler: function(request, reply) {

        return reply.view('pages/policy-en', null, { layout: 'plain' });
    
    }
};
