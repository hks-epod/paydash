'use strict';
var d3 = require('d3');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('monitor/analysis', null, {
            layout: 'monitor'
        });
    }
};

exports.getData = {
    handler: function(request, reply) {
   
      var User = request.server.plugins.sequelize.db.User;
      // Analysis api code here.


    }
};
