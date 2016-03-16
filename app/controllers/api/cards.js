'use strict';

var queries = require('../../helpers/queries');
var utils = require('../../helpers/utils');


exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var region_code = request.query.region_code;
        var queryString = queries.cards(region_code);

        // API CODE
		sequelize.query(queryString, {
		            type: sequelize.QueryTypes.SELECT
		        }).then(function(rows) {
		            
		            var data = {
			        	'overview': {
			        		'current_total':43,
			        		'delayed_total':23,
			        		'days_to_payment':32.2,
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
			        			'musters': [
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
    }
};
