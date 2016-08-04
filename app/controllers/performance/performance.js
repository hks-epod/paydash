'use strict';

const Queries = require('../../helpers/queries');
const PerformanceParser = require('../../helpers/performance_parser');
const Translate = require('../../templates/helpers/t');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('performance/performance');
    }
};

exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var userId = request.auth.credentials.id;
        var role = request.auth.credentials.role;
        var queryString = Queries.performance(userId, role);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {


            if (role === 'block') {
                var data = PerformanceParser.block(rows);
            }

            if (role === 'district') {
                var data = PerformanceParser.district(rows);
            }

            data.config = {
                role: role,
                headers: ['date', 'mrc_mre', 'mre_wlg', 'wlg_wls', 'wls_fto', 'fto_sn1', 'sn1_sn2', 'sn2_prc', 'tot_trn'],
                labels: Translate('/payment_steps_labels', request.auth.credentials), 
                y_axis_label : Translate('/y_axis_labels', request.auth.credentials),
                compare_chart_labels: Translate('/compare_chart_labels', request.auth.credentials),
                comparison_lines: role === 'block' ? ['block', 'district', 'state'] : ['district', 'state']
            };

            reply(final_dict);
        });
    }
};
