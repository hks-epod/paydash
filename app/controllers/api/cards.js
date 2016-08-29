'use strict';

const Queries = require('../../helpers/queries');
const Parser = require('../../helpers/paydroid_parser');
const Boom = require('boom');

exports.getData = {
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false
        }
    },
    handler: function(request, reply) {

        if (!request.auth.isAuthenticated) {
            return reply(Boom.forbidden('You are not logged in'));
        }

        var sequelize = request.server.plugins.sequelize.db.sequelize;

        var userId = request.auth.credentials.id;
        var role = request.auth.credentials.role;
        var version = request.pre.apiVersion;

        var queryString = Queries.paydroid(userId, role, version);

        // API CODE
        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            var data;

            if (version === 1) {
                data = Parser.v1(rows);
            } else if (version === 2) {
                data = Parser.v2(rows, role);
            }

            reply(data);

        });
    }
};
