'use strict';

var D3 = require('d3');
var $ = require('jquery');
var Cookie = require('../lib/cookie');
var Template = require('../lib/template');
var Parser = require('../lib/parser');
var Chart = require('../lib/chart');
var Util = require('../lib/util');

//  Specific Charts
function drawPanchayatPerformance(internals) {
    var limit = Util.discreteLimits(internals);
    internals.data.discrete.forEach(function(region, p_index) {
        if ($('#d_' + region.region_code).length !== 0) {
            var d_step_lines = (internals.discrete_compare_lines !== '') ? [internals.discrete_compare_lines] : internals.stepCols;
            var isCumu = (internals.discrete_compare_lines === '') ? true : false;
            var d_data = Parser.lines({
                data: region.data,
                past_n_days: internals.past_n_days,
                col: d_step_lines,
                isCumulative: isCumu
            });
            Chart.small({
                data: d_data,
                title: region.region_name,
                target: '#d_' + region.region_code,
                legend_target: '.region_legend',
                labels: internals.labels,
                max_y: limit.max_y,
                min_x: limit.min_x,
                max_x: limit.max_x,
            });
        }
    });
}



// Load JSON
exports.init = function() {
    var internals = {
        past_n_days: '',
        discrete_compare_lines: '',
        groupBy: 'TA',
        labels: [
            'Muster roll closure to muster roll entry',
            'Muster roll entry to wage list generation',
            'Wage list generation to wage list sign',
            'Wage list sign to FTO generation',
            'FTO generation to first signature',
            'First signature to second signature',
            'Second signature to processed by bank',
        ],
        stepCols: [1, 2, 3, 4, 5, 6, 7]
    };
    D3.json('/performance/discrete/data?region_code=' + Cookie.read('active_region'))
        .on('progress', function() {
            console.info('progress', D3.event.loaded);
        })
        .get(function(error, data) {
            // Set Canvas 
            D3.select('#loading').remove();
            D3.select('#dashboard').classed('u-hidden', false);
            D3.select('#region_name').text(data.region_name);
            internals.data = data;
            internals.role = data.config.role;

            if (internals.role === 'district') {
                Template.discrete(internals.data.discrete);
            } else if (internals.role === 'block') {
                Template.sortedDiscrete(internals.data.employees[internals.groupBy], internals);
            }
            drawPanchayatPerformance(internals);


        });
};
