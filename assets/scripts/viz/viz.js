'use strict';
var d3 = require('d3');

var chart = require('./chart');

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

//  Parse the "20140412" string to date object
function parseDate(string) {
    var y = string.substring(0, 4);
    var m = string.substring(4, 6);
    var d = string.substring(6, 8);
    return new Date(y, m, d);
}

// Build Line Data
function parseLines(data, past_n_days, col, isCumulative) {
    if (past_n_days !== '') {
        var past_n_date = new Date();
        past_n_date.setDate(past_n_date.getDate() - past_n_days);
    }
    var result = [];
    data.forEach(function(tSmry, index) {
        if (!past_n_date || parseDate(tSmry[0]) >= past_n_date) {
            col.forEach(function(val, index) {
                var obj = {
                    date: parseDate(tSmry[0]),
                };
                obj.value = (isCumulative && result[index - 1]) ? tSmry[val] + result[index - 1][result[index - 1].length - 1].value : tSmry[val];
                obj.total_trans = tSmry[8];
                result[index] = result[index] || [];
                result[index].push(obj);
            });
        }
    });
    return result;
}
//  Specific Charts
function drawBlockPerformance() {
    var b_data = parseLines(paydash.data.block.data, paydash.past_n_days, paydash.stepCols, true);
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
        console.log(data);
        paydash.data = data;
        drawBlockPerformance();
    });

// Time period Selection
d3.selectAll('#modify-time-period-controls button').on('click', function() {
    var target = d3.select(d3.event.target); // Define target
    d3.selectAll('#modify-time-period-controls button').classed('selected', false); // change button state
    target.classed('selected', true);
    paydash.past_n_days = target.attr('data-timeperiod');
    drawBlockPerformance(); // Draw block performance chart
});
