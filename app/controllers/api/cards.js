'use strict';

var d3 = require('d3');
var queries = require('../../helpers/queries');
var utils = require('../../helpers/utils');


exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        // var region_code = request.query.region_code;
        var region_code = '1709003';
        var queryString = queries.cards(region_code);

        // API CODE
		sequelize.query(queryString, {
		        type: sequelize.QueryTypes.SELECT
		    }).then(function(rows) {
		            
	            var overview = utils.flatten(rows[0]);
	            var current_total = overview[0].current_total;
	            var delayed_total = overview[0].delayed_total;
	            var days_to_payment = overview[0].days_to_payment;

	            var cards = utils.flatten(rows[1]);

	            var cards_dict = d3.nest()
	                .key(function(d) {
	                    return d.staff_id;
	                })
	                .rollup(function(v) {
	                    return {
	                        'name': v[0].name,
	                        'designation': v[0].task_assign,
	                        'mobile':v[0].mobile_no,
		        			'current_total':v[0].current_total,
		        			'delayed_total':v[0].delayed_total,
	                        'delayed_musters': v.map(function(d) {
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
	                       	'current_musters': v.map(function(d) {
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
	                .entries(cards)
	                .map(function(d) {
	                    return d.values;
	                });

	            var data = {
		        	'overview': {
		        		'current_total':current_total,
		        		'delayed_total':delayed_total,
		        		'days_to_payment':days_to_payment,
		        		'cards_total':15
		        	},
		        	'cards': [
		        		{
		        			'name':'Aditya Kumar',
		        			'designation':'TA',
		        			'mobile':'9871723511',
		        			'current_total':5,
		        			'delayed_total':5,
		        			'avg_step':10.2,
		        			'delayed_musters': [
		        				{
		        					'msr_no':'12345567780',
		        					'panchayat_name':'Rampur',
		        					'work_name':'Bhothali - Taar Nali Nirman',
		        					'closure_date':'10 March 2016'
		        				}
		        			],
		        			'current_musters': [
		        				{
		        					'msr_no':'12345567780',
		        					'panchayat_name':'Rampur',
		        					'work_name':'Bhothali - Taar Nali Nirman',
		        					'closure_date':'10 March 2016'
		        				}
		        			]
		        		}

		        	]

		        };

	            reply(data);
		    });
    }
};
