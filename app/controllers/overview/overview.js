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

            var data = OverviewParser.parser(rows);
            data.translation = Translate('/web/overview', request.auth.credentials, null);
            reply(data);
        });
    }
};
