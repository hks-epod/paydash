'use strict';

const Queries = require('../../helpers/queries');
const Translate = require('../../templates/helpers/t');
const EditorParser = require('../../helpers/editor_parser');

exports.showPage = {
    auth: {
      scope : ['block', 'editor']
    },
    handler: function(request, reply) {
        return reply.view('editor/editor');
    }
};


exports.getData = {
    auth: {
      scope : ['block', 'editor']
    },
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;

        var block_code = '3401001';
        var step = 't6';
        var queryString = Queries.editor(block_code, step);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            // Notes:
            // staff_id is included for database update purposes, not to be shown on the editor interface
            // panchayat_code is included for database update purposes, not to be shown on the editor interface
            // How do we deal with designations of already-seeded users that are different from the approved list of designations?
            // --> Set the dropdown default as blank and make them choose from the list
            // 

            reply({
                editor :  EditorParser.parser(rows),
                translation : Translate('/editor/editor', request.auth.credentials, null)
            });
        });
    }
};
