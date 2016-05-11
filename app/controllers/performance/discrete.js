'use strict';

var Queries = require('../../helpers/queries');
var DiscreteParser = require('../../helpers/discrete_parser');


exports.showPage = {
    auth: {
        strategy: 'standard'
    },
    handler: function(request, reply) {
        return reply.view('performance/discrete');
    }
};


exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var region_code = request.query.region_code;
        var role = request.auth.credentials.role;
        var queryString = Queries.discretePerformance(region_code, role);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            var final_dict = DiscreteParser.all(rows,role);

            final_dict.config = {
                'headers': ['date', 'mrc_mre', 'mre_wlg', 'wlg_wls', 'wls_fto', 'fto_sn1', 'sn1_sn2', 'sn2_prc', 'tot_trn'],
                'role': request.auth.credentials.role,
                labels: [
                    'Muster roll closure to muster roll entry',
                    'Muster roll entry to wage list generation',
                    'Wage list generation to wage list signing',
                    'Wage list signing to FTO generation',
                    'FTO generation to first signature',
                    'First signature to second signature',
                    'Second signature to processed by bank',
                ],
            };

            reply(final_dict);
        });

    }
};
