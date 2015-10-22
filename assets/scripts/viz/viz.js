'use strict';

var d3 = require('d3');
var chart = require('./chart');
var parser = require('./parser');

// Global state
var paydash = {
    past_n_days: '',
    stepwise_compare_lines: ['block'],
    panchyat_compare_lines: '',
    panchayatGroupBy: 'Sub-Engineer',
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


//  Specific Charts
function drawBlockPerformance(area) {
    var b_data = parser.lines(paydash.data.block.data, paydash.past_n_days, paydash.stepCols, true);
    chart.large({
        data: b_data,
        title: 'Block Performance',
        target: '#block_performance',
        legend_target: '.legend',
        labels: paydash.labels
    }, paydash);
}

// Load JSON
d3.json('/dashboard/block/data')
    .on('progress', function() {
        console.info('progress', d3.event.loaded);
    })
    .get(function(error, data) {
        paydash.data = data;
        drawBlockPerformance();
    });

// Time period Selection
d3.selectAll('#modify-time-period-controls').on('change', function() {
    paydash.past_n_days = d3.event.target.value;
    drawBlockPerformance();
});

// Step Selection
// d3.selectAll('#modify-step-controls').on('change', function() {
//     d3.selectAll('path.mg-main-area').remove(); // Hack to overcome MG's limitation of clearning areas
//     if (d3.event.target.value === '') {
//         paydash.stepCols = [1, 2, 3, 4, 5, 6, 7];
//     } else {
//         paydash.stepCols = [d3.event.target.value];
//     }
//     drawBlockPerformance();
// });
