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

        var block_code = request.query.block || request.auth.credentials.user_regions[0].region_code;
        var step = request.query.step;
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
                translation : Translate('/web/editor', request.auth.credentials, null),
                user: {
                    id : request.auth.credentials.id,
                    regions : request.auth.credentials.user_regions
                }
            });
        });
    }
};

exports.updateData = {
    auth: {
      scope : ['block', 'editor']
    },
    handler: function(request, reply) {

        var block_code = '3304006';
        var Employees = request.server.plugins.sequelize.db.Employees;
        var step = 't2';
        var data = request.payload;

        data.forEach(function(d) {
            Employees.upsert({
                staff_id: '99_',
                name: d.name,
                mobile_no: d.mobile_no,
                block_code: block_code,
                panchayat_code: d.panchayat_code,
                designation: 'TA',
                step: step
            }).then(function(test){ 
                console.log(test);
            });

        });
        // if block level
            // Does a record already exist for this block - step combination?
            // If yes
                // Is it updating an existing person's info?
                // If yes

                // if no
                    // Need to assign a new staff id and update the whole record

            // If no
                // Insert new record
        // if panchayat level

        reply('Changes saved succesfully');

    }
};
