'use strict';

const Queries = require('../../helpers/queries');
const MustersParser = require('../../helpers/musters_parser');
const Translate = require('../../templates/helpers/t');

exports.showPage = {
    auth: {
        scope: ['block', 'district', 'state']
    },
    handler: function(request, reply) {
        return reply.view('musters/musters');
    }
};

exports.getData = {
    auth: {
        scope: ['block', 'district', 'state']
    },
    handler: function(request, reply) {
        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var userId = request.auth.credentials.id;
        var role = request.auth.credentials.role;
        var queryString = Queries.cards(userId, role);

        sequelize
            .query(queryString, {
                type: sequelize.QueryTypes.SELECT
            })
            .then(function(rows) {
                var data;
                if (role === 'block') {
                    data = MustersParser.block(rows);
                    data.config = {
                        role: 'block'
                    };
                } else if (role === 'district') {
                    data = MustersParser.district(rows);
                    data.config = {
                        role: 'district'
                    };
                } else if (role === 'state') {
                    data = MustersParser.state(rows);
                    data.config = {
                        role: 'state'
                    };
                }

                data.translation = Translate('/web/musters', request.auth.credentials, null);

                return reply(data);
            });
    }
};
