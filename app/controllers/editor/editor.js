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

        var block_code = request.query.block_code || request.auth.credentials.user_regions[0].region_code;
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
            var final_result = {
                editor :  EditorParser.parser(rows),
                translation : Translate('/web/editor', request.auth.credentials, null),
                user: {
                    id : request.auth.credentials.id,
                    regions : request.auth.credentials.user_regions
                }
            }; 
            final_result.editor.block_code = block_code;
            reply(final_result);
        });
    }
};

exports.updateData = {
    auth: {
      scope : ['block', 'editor']
    },
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var Employees = request.server.plugins.sequelize.db.Employees;

        var block_code = request.payload.block_code;
        var user_id = request.auth.credentials.id;
        var step = request.payload.step;
        var level = request.payload.data.level;
        var data = request.payload.data.table;

        data.forEach(function(d) {

            var panchayat_code = (level==='panchayat' ? d.panchayat_code : '0000000000');

            // clean up the user-entered inputs
            var name = (d.name===null || d.name.trim()==='') ? null : d.name.trim();
            var mobile_no = (d.mobile_no===null || d.mobile_no.trim()==='') ? null : d.mobile_no.trim();
            var designation = (d.designation===null || d.designation.trim()==='') ? null : d.designation.trim();

            if (name===null && mobile_no===null && designation===null) { // check if fields are empty, in which case we want to delete the record if it exists

                // Update the record to have the current user's id in the edited_by field and set the record to be deleted. 
                // The update trigger will take care of inserting the record into the history table and deleting it from the master table.
                
                Employees.update({
                        to_delete: 1,
                        edited_by: user_id
                    },
                    {
                        fields: ['to_delete','edited_by'],
                        where: {
                            step: step,
                            block_code: block_code,
                            panchayat_code: panchayat_code
                        }
                    }
                ).then(function(result) {
                
                    if (result[0]===1) {
                        Employees.destroy({
                            where: {
                                step: step,
                                block_code: block_code,
                                panchayat_code: panchayat_code,
                                to_delete: 1
                            }
                        });
                    }

                });


            } else {

                // Custom upsert
                // Only update if the user fillable fields (name, designation, mobile) are updated
                // On insert or update assign a new staff id (manual auto increment)
                // Inserting in the history table taken care of by insert/update triggers
                
                var upsertString = Queries.editor_upsert(name,designation,step,mobile_no,block_code,panchayat_code,user_id);

                sequelize.query(upsertString);

            }

        });

        reply('Changes saved succesfully');

    }
};
