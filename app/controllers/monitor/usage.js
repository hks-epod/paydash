'use strict';

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('monitor/usage', null, {layout: 'monitor'});
    }
};

exports.getData = {
    handler: function(request, reply) {


    }
};