'use strict';

const Queries = require('../../helpers/queries');
const Translate = require('../../templates/helpers/t');

exports.show = {
    auth: {
        scope: ['block', 'editor']
    },
    handler: function(request, reply) {
        reply.view('editor/info');

    }
};

exports.getData = {
    auth: {
        scope: ['block', 'editor']
    },
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;

        var block_code = request.query.block || request.auth.credentials.user_regions[0].region_code;
        var queryString = Queries.editor_info(block_code);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            var officer_data = {
                block_officer1: rows[0].designation,
                block_officer2: rows[1].designation
            };

            reply({
                officer_data: officer_data,
                translation: Translate('/web/editor', request.auth.credentials, null)
            });
        });
    }
};
