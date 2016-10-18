'use strict';

exports.home = {
    description: 'Returns the home page',
    auth: {
        mode: 'try',
        strategy: 'standard',
        scope: ['block', 'district', 'editor']
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false // '/login' if set redirects to ./login.
        }
    },
    handler: function(request, reply) {
        reply.view('homepage');

    }
};
