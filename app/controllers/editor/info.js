'use strict';

const Queries = require('../../helpers/queries');
const Translate = require('../../templates/helpers/t');
const Handlebars = require('handlebars');

exports.show = {
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
                block_officer2: rows[1].designation,
                designation: request.auth.credentials.designation
            };

            var template = Handlebars.compile(Translate('/web/editor/info/body', request.auth.credentials, null));
            var result = template(officer_data);
            reply.view('editor/info', {info_body : result});

        });

    }
};
