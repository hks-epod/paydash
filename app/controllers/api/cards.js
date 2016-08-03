'use strict';

const Queries = require('../../helpers/queries');
const Parser = require('../../helpers/paydroid_parser');

exports.getData = {
    plugins: {
        'crumb': {
            skip: true
        }
    },
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;

        var userId = request.auth.credentials.id;
        var role = request.auth.credentials.role;
        var version = request.pre.apiVersion;

        var queryString = Queries.paydroid(userId, role, version);

        // API CODE
        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

        	if (version===1) {

        		var data = Parser.v1(rows);

        	} else if (version===2) {

        		var data = Parser.v2(rows,role);

        	}

        	reply(data);
            
        });
    }
};
