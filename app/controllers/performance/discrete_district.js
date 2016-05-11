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

            // var final_dict = DiscreteParser.all(rows,role);

            var final_dict = {};
            var regionName = rows[0][0].region_name;
            
            final_dict.region_name = regionName;

            var blockResponse = Utils.flatten(rows[1]);
            var panchayatResponse = Utils.flatten(rows[2]);

            // process children data
            final_dict.discrete = D3.nest()
                .key(function(d) {
                    return d.region_code;
                })
                .rollup(function(v) {
                    return {
                        'block_code': v[0].region_code,
                        'block_name': v[0].region_name,
                        'data': v.map(function(d) {
                            return [
                                d.date.getFullYear() + '' + Utils.padNum(d.date.getMonth() + 1) + '' + Utils.padNum(d.date.getDate()),
                                d.mrc_mre,
                                d.mre_wlg,
                                d.wlg_wls,
                                d.wls_fto,
                                d.fto_sn1,
                                d.sn1_sn2,
                                d.sn2_prc,
                                d.tot_trn
                            ];
                        }),
                        'panchayats': panchayatResponse.filter(function(d) { return d.block_code === v[0].region_code; })
                    };
                })
                .entries(blockResponse)
                .map(function(d) {
                    return d.values;
                })
                .sort(function(a, b) {
                    var aTarget = a.data[a.data.length - 1];
                    var bTarget = b.data[b.data.length - 1];
                    var aSum = aTarget[1] + aTarget[2] + aTarget[3] + aTarget[4] + aTarget[5] + aTarget[6] + aTarget[7];
                    var bSum = bTarget[1] + bTarget[2] + bTarget[3] + bTarget[4] + bTarget[5] + bTarget[6] + bTarget[7];
                    return bSum - aSum;
                });

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
