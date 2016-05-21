'use strict';

var Queries = require('../../helpers/queries');
var DiscreteParser = require('../../helpers/discrete_parser');

exports.showPage = {
    auth: {
        strategy: 'standard'
    },
    handler: function(request, reply) {
        return reply.view('performance/discrete');
    }
};


exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var region_code = request.query.region_code;
        var role = request.auth.credentials.role;
        var queryString = Queries.discretePerformance(region_code, role);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            if (role === 'block') {
                var final_dict = DiscreteParser.block(rows, role, request.auth.credentials);
            } else if (role === 'district') {
                var final_dict = DiscreteParser.district(rows, role, request.auth.credentials);
            }

            reply(final_dict);
        });

    }
};
