'use strict';

module.exports = {
    auth: {
        strategy: 'standard'
    },
    handler: function(request, reply) {

        return reply.view('dashboard/block');

    }
};
