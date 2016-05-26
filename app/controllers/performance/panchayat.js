'use strict';

var Queries = require('../../helpers/queries');
var Utils = require('../../helpers/utils');
var Translate = require('../../templates/helpers/t');

exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var region_code = request.query.panchayat_code;
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
                labels: Translate('/payment_steps_labels', request.auth.credentials), 
                y_axis_label : Translate('/y_axis_labels', request.auth.credentials),
            };
            reply(final_dict);
        });

    }
};
