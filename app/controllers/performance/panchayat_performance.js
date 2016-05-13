'use strict';

var Queries = require('../../helpers/queries');


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
        var region_code = '1701001001'; // this is the panchayat code we want to return data for!!
        var queryString = Queries.panchayatPerformance(region_code);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            var final_dict = {};
            var regionResponse = Utils.flatten(rows[0]);
            var panchayatResponse = Utils.flatten(rows[1]);
            var panchayatName = regionResponse[0].region_name;
            var panchayatCode = region_code;
            final_dict.panchayat = {
                'panchayat_code': panchayatCode,
                'panchayat_name': panchayatName,
                'data': panchayatResponse.map(function(d) {
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
                })
            };

            final_dict.config = {
                'headers': ['date', 'mrc_mre', 'mre_wlg', 'wlg_wls', 'wls_fto', 'fto_sn1', 'sn1_sn2', 'sn2_prc', 'tot_trn'],
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
            console.log(final_dict);
            reply(final_dict);
        });

    }
};
