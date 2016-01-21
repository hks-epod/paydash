'use strict';
var d3 = require('d3');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('monitor/analysis', null, {
            layout: 'monitor'
        });
    }
};

exports.getData = {
    handler: function(request, reply) {
   
      var User = request.server.plugins.sequelize.db.User;
      // Analysis api code here.

      var labels = {
        'mrc_processed': 'Muster roll closure to bank confirmation', 
        'mrc_mre': 'Step 1: Muster roll closure to muster roll entry', 
        'mre_wlg': 'Step 2: Muster roll entry to wage list generation', 
        'wlg_wls': 'Step 3: Wage list generation to wage list signature', 
        'wls_fto' :'Step 4: Wage list signature to FTO generation', 
        'fto_firstsign': 'Step 5: FTO generation to FTO first signature', 
        'firstsign_secondsign': 'Step 6: FTO first signature to FTO second signature',  
        'secondsign_processed': 'Step 7: FTO second signature to bank confirmation', 
        'pd': 'Person-days', 
        'exp': 'Wage expenditure'
      };
      var outcomes = ['mrc_processed', 'mrc_mre', 'mre_wlg', 'wlg_wls', 'wls_fto', 'fto_firstsign', 'firstsign_secondsign', 'secondsign_processed', 'pd', 'exp'];

      /*

      Loop over the outcomes array to build this JSON. Each outcome will be displayed on the dashboard with the label (title), 4 summary stats, and treatment/control line chart with the upper and lower bounds for each line
      

      for outcome in outcomes, build this JSON:
      [{
            'label' : labels[outcome],
            'treatment': { // treatment line on the line chart
                  SELECT date, mean, upper, lower FROM estimates_series WHERE outcome = outcome AND treatment = 1;
      		'series': [
                        {
                              'date':,
                              'mean':,
                              'upper':,
                              'lower':
                        }

      		]
      	},

      	'control': { // control line on the line chart
                  SELECT date, mean, upper, lower FROM estimates_series WHERE outcome = outcome AND treatment = 0;
      		'series': [
                        {
                              'date':,
                              'mean':,
                              'upper':,
                              'lower':
                        }
      		]
      	},
      	'summary': { // display these 4 summary statistics under the label for the line chart
                  SELECT treatment_mean, control_mean, diff, p_val FROM estimates_summary WHERE outcome = outcome;
      		'treatmentMean':,
      		'controlMean':,
                  'difference':,
      		'pValue':,
      	}	
      }]

      */

    }
};
