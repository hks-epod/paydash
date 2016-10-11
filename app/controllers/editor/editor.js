'use strict';

const Queries = require('../../helpers/queries');
const Translate = require('../../templates/helpers/t');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('editor/editor');
    }
};

exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var role = request.auth.credentials.role;
        var userId = request.auth.credentials.id;
        var queryString = Queries.overview(userId, role);
        var step = 't2';

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            // var data = OverviewParser.parser(rows);

            // Notes:
            // staff_id is included for database update purposes, not to be shown on the editor interface
            // How do we deal with designations of already-seeded users that are different from the approved list of designations?
            // --> Set the dropdown default as blank and make them choose from the list
            // 

            var data = {
                level: 'panchayat',
                table:[
                    {
                        panchayat: 'p1',
                        staff_id: '12345',
                        name: 'name',
                        mobile: '1234567890',
                        designation: 'designation1'
                    },
                    {
                        panchayat: 'p2',
                        staff_id: '23456',
                        name: 'name',
                        mobile: '1234567890',
                        designation: 'designation1'
                    }     
                ],
                designations: ['designation1','designation2','Other']
            };


            // data.translation = Translate('/editor/editor', request.auth.credentials, null);
            reply(data);
        });
    }
};
