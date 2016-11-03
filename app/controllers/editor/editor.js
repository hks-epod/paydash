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

        var block_code = request.payload.block_code;
        var user_id = request.auth.credentials.id;
        var Employees = request.server.plugins.sequelize.db.Employees;
        var EmployeesHistory = request.server.plugins.sequelize.db.EmployeesHistory;
        var step = request.payload.step;
        var level = request.payload.data.level;
        var data = request.payload.data.table;

        // If all the fillable fields (name, mobile_no, designation) are empty, we need to delete the record if it exists, recording the deletion manually in the history table. 
            // we can't use triggers here because we need to record who made the deletion.
        // If there is new information to put in the database, we do an upsert and let our insert/update triggers record the changes automatically in the history table.
            // there is an edge case here: since the updated_by field starts out as null, update operations will occur on the master table the first time someone saves the interface table even for rows where no user changes were made.
            // the same phenomenon will also occur if a different user comes in and saves the interface table

        data.forEach(function(d) {

            var panchayat_code = (level==='panchayat' ? d.panchayat_code : '0000000000');

            if ((d.name===null || d.name.trim()==='') && (d.mobile_no===null || d.mobile_no.trim()==='') && (d.designation===null || d.designation.trim()==='')) { // check if fields are empty, in which case we want to delete the record if it exists
                

                Employees.findOne({ // check if the record exists
                    where: {
                        step: step,
                        block_code: block_code,
                        panchayat_code: panchayat_code
                    }
                })
                .then(function(employee) {
                    if (employee) { // the record exists, so we log it in the history table then delete the record in the master table
                        EmployeesHistory.create({
                            staff_id: employee.staff_id,
                            name: employee.name,
                            mobile_no: employee.mobile_no,
                            block_code: block_code,
                            panchayat_code: panchayat_code,
                            designation: employee.designation,
                            step: step,
                            edited_by: user_id,
                            edited_at: new Date(),
                            action: 'delete'
                        }).then(function() {
                            Employees.destroy({
                                where: {
                                    step: step,
                                    block_code: block_code,
                                    panchayat_code: panchayat_code,
                                }
                            });
                        });
                    }
                });


            } else { // we can insert or update in the database table. update will occur if a duplicate on the primary key is found (step, block_code, panchayat_code), otherwise an insert will occur. if the whole row is a duplicate nothing will happen, but the gotcha is the edited_by field may be different from the id of the current user, in which case an update will occur.

                // to do
                // test and check logged result

                // clean up the user-entered inputs
                var name = (d.name.trim()==='' ? null : d.name.trim());
                var mobile_no = (d.mobile_no.trim()==='' ? null : d.mobile_no.trim());
                var designation = (d.designation.trim()==='' ? null : d.designation.trim());
                
                upsertString = Queries.editor_upsert(name,designation,step,mobile_no,block_code,panchayat_code,user_id);
                sequelize.query(upsertString, {
                    type: sequelize.QueryTypes.UPSERT
                }).then(function(result) {
                    console.log(result);
                });

            }

        });

        reply('Changes saved succesfully');

    }
};
