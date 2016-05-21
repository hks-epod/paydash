'use strict';

var Queries = require('../../helpers/queries');
var OverviewParser = require('../../helpers/overview_parser');
var Translate = require('../../templates/helpers/t');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('performance/overview');
    }
};

exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var region_code = request.query.region_code;
        var role = request.auth.credentials.role;
        var queryString = Queries.overviewPerformance(region_code, role);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            var final_dict;

            if (role === 'block') {
                final_dict = OverviewParser.block(rows);
            }

            if (role === 'district') {
                final_dict = OverviewParser.district(rows);
            }

            final_dict.config = {
                role: role,
                headers: ['date', 'mrc_mre', 'mre_wlg', 'wlg_wls', 'wls_fto', 'fto_sn1', 'sn1_sn2', 'sn2_prc', 'tot_trn'],
                labels: Translate('/payment_steps_labels', request.auth.credentials),
                comparison_lines: role === 'block' ? ['block', 'district', 'state'] : ['district', 'state']
            };

            reply(final_dict);
        });
    }
};
