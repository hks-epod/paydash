'use strict';

exports.showPage = {
    auth: {
      scope : ['monitoring']
    },
    handler: function(request, reply) {
        return reply.view('monitor/system', null, {layout: 'monitor'});
    }
};

exports.getData = {
    auth: {
      scope : ['monitoring']
    },
    handler: function(request, reply) {


    }
};