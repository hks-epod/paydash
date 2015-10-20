'use strict';

module.exports = {
    auth: {
        strategy: 'standard'
    },
    plugins: {
        crumb: {
            key: 'crumb',
            source: 'payload',
            restful: true
        }
    },
    handler: function(request, reply) {

        request.auth.session.clear();
        request.session.flash('success', 'Logged out successfully');
        return reply.redirect('/login');

    }
};
