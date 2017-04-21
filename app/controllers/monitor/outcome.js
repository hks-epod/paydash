'use strict';
const Queries = require('../../helpers/queries');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('monitor/user', null, {layout: 'monitor'});
    }
};

exports.getData = {
    handler: function(request, reply) {

    	

    	//'SELECT b.treatment_label, a.mrc_mre, a.mre_wlg, a.wlg_wls, a.wls_fto, a.fto_sn1, a.sn1_sn2, a.sequelize, a.mrc_prc FROM estimates_summary a left join (SELECT DISTINCT treatment, treatment_label FROM treatment) b ON a.treat_arm=b.treatment;'

		var sequelize = request.server.plugins.sequelize.db.sequelize;

		var step = 'mrc_mre';

		var queryString = 'SELECT b.treatment_label, a.period, a.val_type, a.'+step+' AS value FROM estimates_series a left join (SELECT DISTINCT treatment, treatment_label FROM treatment) b ON a.treat_arm=b.treatment;';

        // var queryString = Queries.estimates(step);

        // API CODE
        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

        	console.log(rows[0])

            var estimates_series = D3.nest()
                .key(function(d) {
                    return d.treatment_label;
                })
                .rollup(function(v) {
                    return {
                        'line_label': v[0].treatment_label,
                        'line_data': v.map(function(d) {
                            return {
                                'x_val': d.period,
                                'y_val': d.b,
                                'y_upper': d.ci_u,
                                'y_lower': d.ci_l
                            };
                        })
                    };
                })
                .entries(D3.values(rows[0]))
                .map(function(d) {
                    return d.value;
                });

            var estimates_summary = [
            	['','(1)','(2)','(3)','(4)','(5)','(6)','(7)','(8)'],
            	['','mrc_mre','mre_wlg','wlg_wls','wls_fto','fto_sn1','sn1_sn2','sn2_prc','mrc_prc']
            ];


            reply(data);

        });
// treat_arm
// period
// period_name
// val_type
// mrc_mre
// mre_wlg
// wlg_wls
// wls_fto
// fto_sn1
// sn1_sn2
// sn2_prc
// mrc_prc 

	}
};