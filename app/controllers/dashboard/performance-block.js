'use strict';

var queries = require('../../helpers/queries');
var dummy = require('../../helpers/dummy');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('dashboard/block');
    }
};

exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var block_code = '1709003';
        var queryString = queries.blockPerformance(block_code);

        // sequelize.query('SELECT * from users', {
        //     type: sequelize.QueryTypes.SELECT
        // }).then(function(results) {
        //     reply(results);
        // });
        

        reply(dummy.blockData); 
        

    }
};
