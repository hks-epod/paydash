'use strict';
var d3 = require('d3');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('monitor/analysis');
    }
};
