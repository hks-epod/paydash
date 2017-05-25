'use strict';

const Joi = require('joi');
const Queries = require('../../helpers/queries');
const Translate = require('../../templates/helpers/t');
const EditorParser = require('../../helpers/editor_parser');

exports.showPage = {
    auth: {
        scope: ['block', 'editor']
    },
    handler: function(request, reply) {
        return reply.view('editor/editor');
    }
};

exports.getData = {
    auth: {
        scope: ['block', 'editor']
    },
    handler: function(request, reply) {
        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var block_code =
            request.query.block_code || request.auth.credentials.user_regions[0].region_code;
        var step = request.query.step;
        var queryString = Queries.editor(block_code, step);

        sequelize
            .query(queryString, {
                type: sequelize.QueryTypes.SELECT
            })
            .then(function(rows) {
                var final_result = {
                    editor: EditorParser.parser(rows),
                    translation: Translate('/web/editor', request.auth.credentials, null),
                    user: {
                        id: request.auth.credentials.id,
                        regions: request.auth.credentials.user_regions
                    }
                };
                final_result.editor.block_code = block_code;
                reply(final_result);
            });
    }
};

exports.updateData = {
    auth: {
        scope: ['block', 'editor']
    },
    validate: {
        payload: {
            // payload for POST, query for GET
            block_code: Joi.string().min(1).max(20),
            step: Joi.string().min(1).max(20),
            data: Joi.object().keys({
                block_code: Joi.string().min(1).max(20),
                designations: Joi.array(),
                level: Joi.string().min(1).max(20),
                table: Joi.array()
            })
        },
        failAction: function(request, reply, source, error) {
            return reply('Something went wrong');
        }
    },
    handler: function(request, reply) {
        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var Employees = request.server.plugins.sequelize.db.Employees;
        var Employee_regions = request.server.plugins.sequelize.db.Employee_regions;

        var block_code = request.payload.block_code;
        var user_id = request.auth.credentials.id;
        var step = request.payload.step;
        var level = request.payload.data.level;
        var data = request.payload.data.table;

        data.forEach(function(d, i) {
            var panchayat_code = level === 'panchayat' ? d.panchayat_code : '';

            // clean up the user-entered inputs
            var name = d.name === null || d.name.trim() === ''
                ? ''
                : d.name.trim().replace(/\s\s+/g, ' ').toLowerCase();
            var mobile_no = d.mobile_no === null || d.mobile_no.trim() === ''
                ? ''
                : d.mobile_no.trim().replace('-', '').replace(/\s/g, '');
            var designation = d.designation === null || d.designation.trim() === ''
                ? ''
                : d.designation.trim();

            if (name === '' && mobile_no === '' && designation === '') {
                // check if fields are empty, in which case we want to delete the record if it exists

                // Update the record to have the current user's id in the edited_by field and set the record to be deleted.
                // The update trigger will take care of inserting the record into the history table and deleting it from the master table.

                Employee_regions.update(
                    {
                        to_delete: 1,
                        edited_by: user_id
                    },
                    {
                        fields: ['to_delete', 'edited_by'],
                        where: {
                            step: step,
                            block_code: block_code,
                            panchayat_code: panchayat_code
                        }
                    }
                )
                    .then(function(result) {
                        if (result[0] === 1) {
                            Employee_regions.destroy({
                                where: {
                                    step: step,
                                    block_code: block_code,
                                    panchayat_code: panchayat_code,
                                    to_delete: 1
                                }
                            });
                        }
                    })
                    .catch(function(err) {
                        return reply('Unable to save changes');
                    });
            } else {
                // Custom upsert
                // Only update if the user fillable fields (name, designation, mobile) are updated
                // Inserting in the history table taken care of by insert/update triggers

                // Insert ignore in the employees_unique table
                // Upsert into the employee_regions table, use embedded select to get the appropriate staff_id from empoyees_unique

                var insertString = Queries.editor_insert_unique(name, mobile_no);

                var upsertString = Queries.editor_upsert(
                    name,
                    designation,
                    step,
                    mobile_no,
                    block_code,
                    panchayat_code,
                    user_id
                );

                // console.log(insertString)
                sequelize.query(insertString).then(function(result) {
                    sequelize.query(upsertString);
                });
                // .catch(function(err) { return reply('Unable to save changes'); });

                // console.log(upsertString);
                // sequelize.query(upsertString);
                // .catch(function(err) { return reply('Unable to save changes'); });
            }
        });

        reply(Translate('/web/editor/editor/success', request.auth.credentials, null));
    }
};
