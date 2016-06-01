'use strict';

var d3 = require('d3');
var queries = require('../../helpers/queries');
var utils = require('../../helpers/utils');


exports.getData = {
	plugins: {
        'crumb': {
            skip: true
        }
    },
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;

        var userId = request.auth.credentials.id;

        var queryString = queries.cards(userId);

        // API CODE
		sequelize.query(queryString, {
		        type: sequelize.QueryTypes.SELECT
		    }).then(function(rows) {
		            
	            var overviewResponse = utils.flatten(rows[0]);

	            var cardsResponse = utils.flatten(rows[1]);

	            var blockResponse = utils.flatten(rows[2]);

	            var panchayatResponse = utils.flatten(rows[3]);

	            var notificationsResponse = utils.flatten(rows[4]);

	            // Parse the overview response
	           	var current_total = overviewResponse[0].current_total;
	            var delayed_total = overviewResponse[0].delayed_total;
	            var days_to_payment = overviewResponse[0].time_to_payment;
	            var total_transactions = overviewResponse[0].total_transactions;

	            // Nest the cards response and include the overview stats
	            var cards = d3.nest()
	                .key(function(d) {
	                    return d.staff_id;
	                })
	                .rollup(function(v) {
	                    return {
	                        'name': v[0].name,
	                        'staff_id': v[0].staff_id,
	                        'designation': v[0].task_assign,
	                        'mobile':v[0].mobile_no,
	                        'block_name':v[0].block_name,
		        			'current_total':v[0].current_total,
		        			'delayed_total':v[0].delayed_total,
	                        'delayed_musters': v.filter(function(d) { return d.type==='delayed_musters'; }).map(function(d) {
	                            return [
	                                {
	                                	'msr_no':d.msr_no,
	                                	'panchayat_name':d.panchayat_name,
	                                	'work_name':d.work_name,
	                                	'work_code':d.work_code,
	                                	'closure_date':d.end_date,
	                                	'days_pending':d.days_pending
	                            	}
	                            ];
	                        }),
	                       	'current_musters': v.filter(function(d) { return d.type==='current_musters'; }).map(function(d) {
	                            return [
	                                {
	                                	'msr_no':d.msr_no,
	                                	'panchayat_name':d.panchayat_name,
	                                	'work_name':d.work_name,
	                                	'work_code':d.work_code,
	                                	'closure_date':d.end_date
	                            	}
	                            ];
	                        })
	                    };
	                })
	                .entries(cardsResponse)
	                .map(function(d) {
	                    return d.values;
	                });


	            // Nest the block response
	            var blockPerformance = d3.nest()
	                .key(function(d) {
	                    return d.block_code;
	                })
	                .rollup(function(v) {
	                    return {
	                        'block_code': v[0].block_code,
	                        'block_name': v[0].block_name,
	                        'data': v.map(function(d) {
	                            return [
	                                d.date.getFullYear() + '' + utils.padNum(d.date.getMonth() + 1) + '' + utils.padNum(d.date.getDate()),
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


	            // Nest the panchayat response
	            var panchayatPerformance = d3.nest()
	                .key(function(d) {
	                    return d.panchayat_code;
	                })
	                .rollup(function(v) {
	                    return {
	                    	'block_code': v[0].block_code,
	                        'panchayat_code': v[0].panchayat_code,
	                        'panchayat_name': v[0].panchayat_name,
	                        'data': v.map(function(d) {
	                            return [
	                                d.date.getFullYear() + '' + utils.padNum(d.date.getMonth() + 1) + '' + utils.padNum(d.date.getDate()),
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
	                })
	                .entries(panchayatResponse)
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

            	var headers = ['date', 'mrc_mre', 'mre_wlg', 'wlg_wls', 'wls_fto', 'fto_sn1', 'sn1_sn2', 'sn2_prc', 'tot_trn'];

	            var data = {
		        	'overview': {
		        		'current_total':current_total,
		        		'delayed_total':delayed_total,
		        		'days_to_payment':days_to_payment,
		        		'total_transactions':total_transactions,
		        		'cards_total': cards.length
		        	},
		        	'cards': cards,
		        	'block_performance': blockPerformance,
		        	'panchayat_performance': panchayatPerformance,
		        	'notifications': notificationsResponse,
		        	'config': {
		        		'headers': headers,
		        		labels: [
		        			'Date',
		        		    'Muster roll closure to muster roll entry',
		        		    'Muster roll entry to wage list generation',
		        		    'Wage list generation to wage list sent',
		        		    'Wage list sent to FTO generation',
		        		    'FTO generation to first signature',
		        		    'First signature to second signature',
		        		    'Second signature to processed by bank',
		        		    'Total Transactions'
		        		],
		        	}
		        };

	            reply(data);
		    });
    }
};
