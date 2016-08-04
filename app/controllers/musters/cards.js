'use strict';

const Queries = require('../../helpers/queries');
const CardsParser = require('../../helpers/cards_parser');
const Translate = require('../../templates/helpers/t');
const Utils = require('../../helpers/utils');
const D3 = require('d3');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('musters/cards');
    }
};

exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var userId = request.auth.credentials.id;
        var role = request.auth.credentials.role;
        var queryString = Queries.cards(userId, role);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            if (role === 'block') {

                var data = CardsParser(rows);

            } else if (role === 'district') {
                
                 

            }


            reply(data);
        });
    }
};
