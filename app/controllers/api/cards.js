'use strict';

var d3 = require('d3');
var queries = require('../../helpers/queries');
var utils = require('../../helpers/utils');


exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;

        var userId = request.auth.credentials.id;

        var queryString = queries.cards(userId);

        // API CODE
		sequelize.query(queryString, {
		        type: sequelize.QueryTypes.SELECT
		    }).then(function(rows) {
		            
	            var overview = utils.flatten(rows[0]);
	            var current_total = overview[0].current_total;
	            var delayed_total = overview[0].delayed_total;
	            var days_to_payment = overview[0].days_to_payment;

	            var cards_response = utils.flatten(rows[1]);

	            var cards = d3.nest()
	                .key(function(d) {
	                    return d.staff_id;
	                })
	                .rollup(function(v) {
	                    return {
	                        'name': v[0].name,
	                        'designation': v[0].task_assign,
	                        'mobile':v[0].mobile_no,
	                        'block_name',v[0].block_name,
		        			'current_total':v[0].current_total,
		        			'delayed_total':v[0].delayed_total,
	                        'delayed_musters': v.filter(function(d) { return d.type==='delayed_musters'; }).map(function(d) {
	                            return [
	                                {
	                                	'msr_no':d.msr_no,
	                                	'panchayat_name':d.panchayat_name,
	                                	'work_name':d.work_name,
	                                	'work_code':d.work_code,
	                                	'closure_date':d.end_date
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
	                .entries(cards_response)
	                .map(function(d) {
	                    return d.values;
	                });

	            var data = {
		        	'overview': {
		        		'current_total':current_total,
		        		'delayed_total':delayed_total,
		        		'days_to_payment':days_to_payment,
		        		'cards_total': cards.length
		        	},
		        	'cards': cards
		        };

	            reply(data);
		    });
    }
};
