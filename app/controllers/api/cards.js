'use strict';

const Queries = require('../../helpers/queries');
const Parser = require('../../helpers/paydroid_parser');
const Boom = require('boom');
const D3 = require('d3');

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
        var name = request.auth.credentials.firstname + ' ' + request.auth.credentials.lastname;

        var queryString = Queries.paydroid(userId, role, version);

        // API CODE
        sequelize
            .query(queryString, {
                type: sequelize.QueryTypes.SELECT
            })
            .then(function(rows) {
                var data;

                if (version === 1) {
                    data = Parser.v1(rows, userId, name);
                } else if (version === 2) {

                    if (D3.values(rows[4])[0]===undefined) {
                        console.log("Couldn't find state code in db for id:");
                        // console.log(util.inspect(request, {showHidden: false, depth: null}));
                        console.log(request.auth.credentials.id);
                        return reply(Boom.badRequest('Bad request'));
                    }

                    data = Parser.v2(rows, role, userId, name);

                }

                reply(data);
            });
    }
};
