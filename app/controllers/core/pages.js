'use strict';

exports.home = {
    description: 'Returns the home page',
    auth: {
        mode: 'try',
        strategy: 'standard',
        scope: ['block', 'district', 'editor', 'monitoring']
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false // '/login' if set redirects to ./login.
        }
    },
    handler: function(request, reply) {

        if(request.auth.credentials && request.auth.credentials.scope === 'monitoring'){
            return reply.redirect('/monitor/usage');
        }
        reply.view('homepage');
    }
};

exports.policy = {
    description: 'Returns the policy page',
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
        if(request.auth.credentials && request.auth.credentials.lang === 'hi'){
            return reply.view('pages/policy-hi');
        }else {
            return reply.view('pages/policy-en');
        }  
    }

};
