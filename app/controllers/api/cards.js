'use strict';

var queries = require('../../helpers/queries');
var parser = require('../../helpers/paydroid_parser');

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
        version = 2;
        var queryString = queries.cards(userId,role,version);

        // API CODE
        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

        	if (version===1) {

        		var data = parser.v1(rows);

        	} else if (version===2) {

        		var data = parser.v2(rows,role);

        	}

        	reply(data);
            
        });
    }
};
