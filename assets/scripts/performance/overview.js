'use strict';

var D3 = require('d3');
var Cookie = require('../lib/cookie');
var Parser = require('../lib/parser');
var Chart = require('../lib/chart');


// Load JSON
exports.init = function() {
    var internals = {
        past_n_days: '',
        stepwise_compare_step: 1,
        stepwise_compare_lines: ['block', 'state', 'district'],
        panchyat_compare_lines: '',
        panchayatGroupBy: 'Sub-Engineer',
        labels: [
            'Muster roll closure to muster roll entry',
            'Muster roll entry to wage list generation',
            'Wage list generation to wage list signing',
            'Wage list signing to FTO generation',
            'FTO generation to first signature',
            'First signature to second signature',
            'Second signature to processed by bank',
        ],
        stepCols: [1, 2, 3, 4, 5, 6, 7]
    };

    D3.json('/performance/overview/data?region_code=' + Cookie.read('active_region'))
        .on('progress', function() {
            console.info('progress', D3.event.loaded);
        })
        .get(function(error, data) {
            // Set Canvas 
            D3.select('#loading').remove();
            D3.select('#dashboard').classed('u-hidden', false);
            D3.select('#region_name').text(data.region_name);
            internals.data = data;
            drawBlockPerformance();

        });

    function drawBlockPerformance() {
        var b_data = Parser.lines({
            data: internals.data.block.data,
            past_n_days: internals.past_n_days,
            col: internals.stepCols,
            isCumulative: true
        });
        Chart.flash({
            data: b_data,
            title: 'Region Performance',
            target: '#region_performance',
            legend_target: '.region_legend',
            labels: internals.labels,
            legend_labels: 'labels',
            area: true
        }, internals);
    }
};
