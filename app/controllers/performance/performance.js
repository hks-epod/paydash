'use strict';

const Queries = require('../../helpers/queries');
const PerformanceParser = require('../../helpers/performance_parser');
const Translate = require('../../templates/helpers/t');

exports.showPage = {
    auth: {
        scope: ['block', 'district', 'state']
    },
    handler: function(request, reply) {
        return reply.view('performance/performance');
    }
};

exports.getData = {
    auth: {
        scope: ['block', 'district', 'state']
    },
    handler: function(request, reply) {
        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var userId = request.auth.credentials.id;
        var role = request.auth.credentials.role;
        var queryString = Queries.performance(userId, role);

        sequelize
            .query(queryString, {
                type: sequelize.QueryTypes.SELECT
            })
            .then(function(rows) {
                var data;
                var comparison_lines;
                if (role === 'block') {
                    data = PerformanceParser.block(rows);
                    comparison_lines = ['state', 'district'];
                } else if (role === 'district') {
                    data = PerformanceParser.district(rows);
                    comparison_lines = ['state'];
                } else if (role === 'state') {
                    data = PerformanceParser.state(rows);
                    comparison_lines = [];
                }


                data.config = {
                    role: role,
                    headers: [
                        'date',
                        'mrc_mre',
                        'mre_wlg',
                        'wlg_wls',
                        'wls_fto',
                        'fto_sn1',
                        'sn1_sn2',
                        'sn2_prc',
                        'tot_trn'
                    ],
                    comparison_lines: comparison_lines
                };

                data.translation = Translate('/web/performance', request.auth.credentials, null);

                reply(data);
            });
    }
};
