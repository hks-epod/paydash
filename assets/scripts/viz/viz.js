'use strict';

var d3 = require('d3');
var chart = require('./chart');
var parser = require('./parser');
var read_cookie = require('../components/read_cookie');

// Global state
var paydash = {
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


//  Specific Charts
function drawBlockPerformance() {
    var b_data = parser.lines(paydash.data.block.data, paydash.past_n_days, paydash.stepCols, true);
    chart.large({
        data: b_data,
        title: 'Block Performance',
        target: '#block_performance',
        legend_target: '.block_legend',
        labels: paydash.labels,
        legend_labels: 'labels',
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
        legend_labels: 'stepwise_compare_lines',
        area: false,

    }, paydash);
}

// Load JSON
function blockInit() {
    d3.json('/dashboard/block/data?selected_block_id=' + read_cookie('selected_block_id'))
        .on('progress', function() {
            console.info('progress', d3.event.loaded);
        })
        .get(function(error, data) {
            paydash.data = data;
            drawBlockPerformance();
            drawBlockComparison(1);
        });
}
if (window.location.pathname === '/dashboard/block?block_id='+read_cookie('block_id')) {
    blockInit();
}


// Time period Selection
d3.selectAll('#modify-time-period-controls').on('change', function() {
    paydash.past_n_days = d3.event.target.value;
    drawBlockPerformance();
    drawBlockComparison(1);
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
d3.selectAll('#modify-step-controls').on('change', function() {
    paydash.stepwise_compare_step = d3.event.target.value;
    drawBlockComparison(paydash.stepwise_compare_step);
});
