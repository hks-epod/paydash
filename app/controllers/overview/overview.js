'use strict';

const Queries = require('../../helpers/queries');
const OverviewParser = require('../../helpers/overview_parser');
const Translate = require('../../templates/helpers/t');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('overview/overview');
    }
};

exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        
        var role = request.auth.credentials.role;
        var userId = request.auth.credentials.id;
        var queryString = Queries.overview(userId, role);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            // Database query takes the role as an input (district or block). Parser returns generic "region_code", "region_name" keys.
            
            var data = OverviewParser.parser(rows);

            reply(data);

        });
    }
};
