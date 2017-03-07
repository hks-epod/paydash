'use strict';

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('monitor/user', null, {layout: 'monitor'});
    }
};

exports.getData = {
    handler: function(request, reply) {


    }
};