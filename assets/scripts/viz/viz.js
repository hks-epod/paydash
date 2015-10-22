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
function drawBlockPerformance() {
    var b_data = parser.lines(paydash.data.block.data, paydash.past_n_days, paydash.stepCols, true);
    chart.large({
        data: b_data,
        title: 'Block Performance',
        target: '#block_performance',
        legend_target: '.block_legend',
        labels: paydash.labels,
        area: true
    }, paydash);
}

function drawBlockComparison(val) {
    var c_data = [];
    paydash.stepwise_compare_lines.forEach(function(stepwise_compare_line, index) {
        var line_data = parser.lines(paydash.data[stepwise_compare_line].data, paydash.past_n_days, [val], false);
        if (line_data[0]) {
            c_data.push(line_data[0]); // Workaround to append region data
        }
    });

    chart.large({
        data: c_data,
        title: paydash.labels[val - 1],
        target: '#block_comparison',
        legend_target: '.comparison_legend',
        labels: paydash.labels,
        area: false
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
        drawBlockComparison(1);
    });

// Time period Selection
d3.selectAll('#modify-time-period-controls').on('change', function() {
    paydash.past_n_days = d3.event.target.value;
    drawBlockPerformance();
});


//Stepwise charts step selection
d3.selectAll('.blockSelector').on('click', function() {
    paydash.stepwise_compare_lines = [];
    d3.selectAll('.blockSelector').each(function() {
        if (this.checked === true) {
            paydash.stepwise_compare_lines.push(this.value);
        }
    });
    drawBlockComparison(1);
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
