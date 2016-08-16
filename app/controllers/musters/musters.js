'use strict';

const Queries = require('../../helpers/queries');
const MustersParser = require('../../helpers/musters_parser');
const Translate = require('../../templates/helpers/t');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('musters/musters');
    }
};

exports.getData = {
    handler: function(request, reply) {
        console.log('sdsdsd');
        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var userId = request.auth.credentials.id;
        var role = request.auth.credentials.role;
        var queryString = Queries.cards(userId, role);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {
            var data;
            if (role === 'block') {

                data = MustersParser.block(rows);

            } else if (role === 'district') {

                data = MustersParser.district(rows);

            }

            return reply(data);

        });
    }
};
