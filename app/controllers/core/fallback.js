'use strict';

exports.notfound = {
    description: 'Fallback page for 404 error',
    auth: {
        mode: 'try',
        strategy: 'standard',
        scope: ['block', 'district', 'state', 'user']
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false // '/login' if set redirects to ./login.
        }
    },
    handler: function(request, reply) {
        reply.view('errors/not-found').code(404);
    }
};
